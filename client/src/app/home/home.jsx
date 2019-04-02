import xs from 'xstream'

import init from '../../init'
import cfg from '../../../config.jsx'

import image_left from '../layout/image_left'
import image_right from '../layout/image_right'

export default sources => {
  const {
    HTTP,
  } = sources

  const {
    DOM: row1_dom$,
  } = image_left ({
    width: '33%',
    height: '200px',
    image: 'Cable.jpg',
    text: 'Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin.',
  }) (sources)

  const {
    DOM: row2_dom$,
  } = image_right ({
    width: '33%',
    height: '200px',
    image: 'Flower Puff.jpg',
    text: 'Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin.',
  }) (sources)

  const {
    DOM: row3_dom$,
  } = image_left ({
    width: '33%',
    height: '200px',
    image: 'Granite.jpg',
    text: 'Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin.',
  }) (sources)

  return {
    DOM: (
      xs.combine (
        row1_dom$,
        row2_dom$,
        row3_dom$,
      )
      .map (([
        row1_dom,
        row2_dom,
        row3_dom,
      ]) => (
        <div id='home' style={{background: 'var(--accent-color2)'}}>
          <img id={`home-1`} src={`Basic.jpg`} style={{height: '400px', width: '100%', display: 'block'}} />
          <div style={{display: 'block', textAlign: 'center', padding: '100px'}}>
            Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin. Tempor in consequat reprehenderit. Brisket drumstick picanha, anim nostrud magna sausage pork belly doner dolor venison do. Shank ball tip swine consequat short loin aute ad. Chuck alcatra picanha hamburger. Burgdoggen chicken quis irure commodo ex, voluptate magna dolore short loin elit short ribs pastrami rump. Andouille enim pig, jerky est excepteur jowl alcatra proident sint ex tri-tip pastrami eu.
          </div>
          {row1_dom}
          {row2_dom}
          {row3_dom}
        </div>
      ))
    ),
    HTTP: (
      xs.never ()
    ),
  }
}
