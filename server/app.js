////////////////
//            //
// INITIALIZE //
//            //
////////////////

const fs = require ('fs')
require ('green_curry') (['globalize', 'short F.c'])

// config
const cfg = require ('./config.js')

////////////////
//            //
// INITIALIZE //
//            //
////////////////

const http = require ('http')

const express = require ('express')
const app = express ()
const cookieParser = require ('cookie-parser')
app.use (cookieParser ())
const bodyParser = require ('body-parser')
app.use (bodyParser.urlencoded ({extended: false}))
app.use (bodyParser.json ())

const request = require ('request')

/////////////
//         //
// ROUTING //
//         //
/////////////

const get_header = x => ({
  'Content-Type': 'text/' + {
    css: 'css',
    html: 'html',
    js: 'javascript',
    plain: 'plain',
  }[x],
  'Expires': new Date ().toUTCString (),
  'Cache-Control': 'no-store',
})

const write = res => (...r) => {
  res.writeHead (r[0], get_header (r[1]))
  res.write (r[2])
  res.end ()
}

const rest = m => x => f => app[m] ('/' + x, f)

const [get, post, put, del] = A.map (rest) (['get', 'post', 'put', 'delete'])

//////////////
//          //
// REST API //
//          //
//////////////

// TODO: reset db

// config hijack for local; must mutate object
const crud_cfg = require ('../serverless/src/common/config')
D.iterk (k => v => crud_cfg[k] = v) ({
  ...(cfg.db || {}),
  local: true,
})

// convert serverless functions to server controllers
const adapter = handler => async (req, res) => {
  const resp = await handler ({
    ...req,
    body: JSON.stringify (req.body),
    queryStringParameters: req.query,
    headers: {
      Cookie: (
        F.p (req.cookies || {}) (
          D.pairs
          >> A.map (([k, v]) => `${k}=${v}`)
          >> S.join (';')
        )
      ),
    },
  })
  if (resp.headers['Set-Cookie']) {
    const match = /^session=(.*); Max-Age=(.*)$/.exec (resp.headers['Set-Cookie'])
    res.cookie ('session', match[1], {maxAge: match[2]})
  }
  D.iterk (k => v => res.setHeader (k, v)) ({
    ...resp.headers,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  })
  res.json (JSON.parse(resp.body))
    .end ()
}

const methods = {get, post, put, del}

// dynamically add serverless handlers
const serverless_path = 'serverless/src'
F.p (serverless_path) (
  fs.readdirSync
  >> A.filter (file => fs.lstatSync (`${serverless_path}/${file}`).isFile ())
  >> A.filter (S.match (/(get|post|put|del)_(.*)\.js/))
  >> A.map (S.match (/(get|post|put|del)_(.*)\.js/))
  >> A.map (([file, method, path]) => [require (`../${serverless_path}/${file}`).handler, method, path])
  >> A.filter (A.get (2))
  >> A.map (([f, method, path]) => methods[method] (path) (adapter (f)))
)

//////////////////
//              //
// FILE SERVING //
//              //
//////////////////

app.use (express.static ('build/client'))

////////////////////
//                //
// SOFT RELOADING //
//                //
////////////////////

const exec = require ('child_process').exec

const stdin = process.openStdin ()

stdin.addListener ('data', () => {
  F.log ('Rebuilding the application')
  exec ('node scripts/build.js', () => F.log ('Rebuilding is complete'))
})

app.listen (cfg.port || 8080)
A.iter (F.log) ([
  'Server is ready',
  'Enter to rebuild the web client at any time',
  'server and serverless changes require a restart',
])
