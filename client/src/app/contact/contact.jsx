import xs from 'xstream'

import init from '../../init'
import cfg from '../../../config.jsx'

export default sources => {
  const {
    HTTP,
  } = sources

  return {
    DOM: (
      xs.of (
        <div id='contact'>
          <div style={{width: '50%', float: 'left'}}>
            <div style={{padding: '100px'}}>
              Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin. Tempor in consequat reprehenderit. Brisket drumstick picanha, anim nostrud magna sausage pork belly doner dolor venison do. Shank ball tip swine consequat short loin aute ad. Chuck alcatra picanha hamburger. Burgdoggen chicken quis irure commodo ex, voluptate magna dolore short loin elit short ribs pastrami rump. Andouille enim pig, jerky est excepteur jowl alcatra proident sint ex tri-tip pastrami eu.

              Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin. Tempor in consequat reprehenderit. Brisket drumstick picanha, anim nostrud magna sausage pork belly doner dolor venison do. Shank ball tip swine consequat short loin aute ad. Chuck alcatra picanha hamburger. Burgdoggen chicken quis irure commodo ex, voluptate magna dolore short loin elit short ribs pastrami rump. Andouille enim pig, jerky est excepteur jowl alcatra proident sint ex tri-tip pastrami eu.
            </div>
          </div>
          <div style={{width: '50%', float: 'right'}}>
            <div style={{padding: '100px'}}>
              <input id='name' placeholder="Name"></input>
              <br />
              <br />
              <input id='email' placeholder="Email"></input>
              <br />
              <br />
              <input id='subject' placeholder="Subject"></input>
              <br />
              <br />
              <textarea id='message' placeholder="Message"></textarea>
              <br />
              <br />
              <button id='submit'>Send</button>
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
        </div>
      )
    ),
    HTTP: (
      xs.never ()
    ),
  }
}
