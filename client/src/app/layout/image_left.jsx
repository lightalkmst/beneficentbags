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
  } = args

  return {
    DOM: (
      xs.of (
        <div>
          <img src={image} style={{height, width, display: 'block', float: 'left'}} />
          <div style={{
            height,
            width: `${100 - S.match (/([0-9]+)%/) (width) [1]}%`,
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
