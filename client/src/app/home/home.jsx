import xs from 'xstream'

import init from '../../init'
import cfg from '../../../config.jsx'

export default sources => {
  const {
    HTTP,
  } = sources

  return {
    DOM: (
      xs.never ()
    ),
    HTTP: (
      xs.never ()
    ),
  }
}
