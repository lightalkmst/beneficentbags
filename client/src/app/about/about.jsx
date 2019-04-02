import xs from 'xstream'

import init from '../../init'
import cfg from '../../../config.jsx'

import small_image_left from '../layout/small_image_left'
import small_image_right from '../layout/small_image_right'

export default sources => {
  const {
    HTTP,
  } = sources

  const {
    DOM: row1_dom$,
  } = small_image_left ({
    height: '400px',
    image: 'Cable.jpg',
    padding: '50px',
    text: 'Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin.',
  }) (sources)

  const {
    DOM: row2_dom$,
  } = small_image_right ({
    height: '400px',
    image: 'Flower Puff.jpg',
    padding: '50px',
    text: 'Spicy jalapeno bacon ipsum dolor amet turducken picanha chuck pancetta beef rump sed officia lorem reprehenderit in corned beef voluptate kielbasa short loin.',
  }) (sources)

  return {
    DOM: (
      xs.combine (
        row1_dom$,
        row2_dom$,
      )
      .map (([
        row1_dom,
        row2_dom,
      ]) => (
        <div id='about'>
          {row1_dom}
          {row2_dom}
        </div>
      ))
    ),
    HTTP: (
      xs.never ()
    ),
  }
}
