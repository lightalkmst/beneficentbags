import xs from 'xstream'

import init from '../init'

export default args => sources => {
  const {DOM} = sources

  const {
    group_id,
    selection,
  } = args

  return {
    DOM: (
      xs.of(
        <div>
          <textarea id={group_id}></textarea>
        </div>
      )
    ),
    selection$: (
      DOM.select (`#${group_id}`).events ('change')
      .map (D.get ('target'))
      .map (D.get ('value'))
    ),
  }
}
