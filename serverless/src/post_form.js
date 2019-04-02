const AWS = require ('aws-sdk')
// uses credentials from environment variables
AWS.config.update ({region: 'us-east-1'})
const ses = new AWS.SES ()

require ('green_curry') (['globalize', 'short F.c'])

const cfg = require ('./common/config')

const wrapper = f => async event => {
  const base = {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
    isBase64Encoded: false,
    statusCode: 200,
  }
  try {
    return {
      ...base,
      body: JSON.stringify ((await f(event)) || {}),
    }
  }
  catch (err) {
    return {
      ...base,
      body: 'Failure',
      statusCode: 500,
    }
  }
}

const handler = wrapper (async event => {
  const body = JSON.parse (event.body)

  const calculate_cost = ({
    color,
    style,
    drawstring_material,
    drawstring_color,
    size,
    pocket,
    pocket_size,
    pocket_color,
    pocket_ribbon_color,
  }) => {
    // use only basic syntax so that Suzanne can easily change this at-will
    return (1).toFixed (2)
  }

  return await ({
    calculate: () => calculate_cost (body),
    submit: async () => {
      const {
        color,
        style,
        drawstring_material,
        drawstring_color,
        size,
        pocket,
        pocket_size,
        pocket_color,
        pocket_ribbon_color,
        additional_requests,
        contact_information,
      } = body

      const cost = calculate_cost (body)

      const trim = F.c (
        S.replace (/\n +/g) ('\n')
        >> S.trim
      )

      // retry
      let count = cfg.max_retries
      while (count--) {
        try {
          await ses.sendEmail({
            Destination: {ToAddresses: [cfg.email_to] },
            Message: {
              Subject: {Data: 'New bag order was placed'},
              Body: {
                Text: {
                  Data: trim (`
                    Zanne,

                    A new bag order has been placed.

                    Color: ${color.join (', ')}
                    Style: ${style}
                    Drawstring Material: ${drawstring_material}
                    Drawstring Color: ${drawstring_color.join (', ')}
                    Bag Size: Length ${size[0]}" by Width ${size[1]}"
                    Interior Pocket: ${pocket}
                    ${trim (
                      pocket == 'Yes'
                      ? `
                        Interior Pocket Size: Length ${pocket_size[0]}" by Width ${pocket_size[1]}"
                        Interior Pocket Color: ${pocket_color}
                        Interior Pocket Ribbon Color: ${pocket_ribbon_color}
                      `
                      : ''
                    )}

                    Additional Customization Requests:
                    ${additional_requests}

                    Customer First Name: ${contact_information[0]}
                    Customer Last Name: ${contact_information[1]}
                    Customer E-mail: ${contact_information[2]}
                    Customer Address: ${contact_information[3]}
                  `),
                }
              },
            },
            Source: cfg.email_from,
          })
          .promise ()

          return 'Success'
        }
        catch (err) {}
      }
      return 'Failure'
    },
  }[body.mode]) ()
})

exports && (exports.handler = handler)
