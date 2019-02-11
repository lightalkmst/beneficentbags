import xs from 'xstream'

import init from '../init'

export default sources => {
  const {
    HTTP,
    success$,
  } = sources

  return {
    DOM: (
      success$.map (() => (
        <div id='submitted'>
          Thank You!
          <br />
          Your order has been successfully submitted!
          <br />
          You should receive an e-mail within a few days confirming the order.
          <br />
          If you do not receive an e-mail, please e-mail cook.zanne@gmail.com.
        </div>
      ))
    ),
  }
}
