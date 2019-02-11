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
        <ul id={group_id}>
          {
            A.map (x => (
              <li>
                <input type='radio' id={`${group_id}-${idify (x)}`} name={group_id} value={x} />
                <label for={`${group_id}-${idify (x)}`}>{x}</label>
                {x == 'Other' && ' - '}
                {x == 'Other' && <input type='text' id={`${group_id}-other_info`} />}
              </li>
            )) (selection)
          }
        </ul>
      )
    ),
    selection$: (
      xs.merge (
        ...A.map (x =>
          x != 'Other'
          ? (
            DOM.select (`#${group_id}-${idify (x)}`).events ('click')
            .map (D.get ('target'))
            .map (D.get ('value'))
          )
          : (
            xs.combine (
              DOM.select (`#${group_id}-other`).events ('click'),
              DOM.select (`#${group_id}-other_info`).events ('change')
              .map (D.get ('target'))
              .map (D.get ('value'))
              .startWith (''),
            )
            .map (A.get (1))
            .map (x => `Other: ${x}`)
          )
        ) (selection)
      )
    ),
  }
}
