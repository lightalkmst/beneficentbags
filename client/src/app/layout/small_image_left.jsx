import xs from 'xstream'

import init from '../../init'
import cfg from '../../../config.jsx'

export default args => sources => {
  const {
    HTTP,
  } = sources

  const {
    image,
    width,
    height,
    text,
    padding,
  } = args

  return {
    DOM: (
      xs.of (
        <div>
          <img src={image} style={{height, width: '50%', padding, display: 'block', float: 'left', boxSizing: 'border-box'}} />
          <div style={{
            height,
            width: '50%',
            padding,
            display: 'block',
            float: 'right',
          }}>
            <div style={{
              textAlign: 'center',
              padding: `${S.match (/([0-9]+)px/) (height) [1] / 3}px`,
            }}>
              {text}
            </div>
          </div>
          <div style={{height: '0', clear: 'both'}} />
        </div>
      )
    ),
    HTTP: (
      xs.never ()
    ),
  }
}
