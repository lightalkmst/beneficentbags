import xs from 'xstream'

import init from '../../../init'

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
                <input type='checkbox' id={`${group_id}-${idify (x)}`} name={group_id} value={x} />
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
      xs.combine (
        ...A.map (x =>
          (x != 'Other'
          ? (
            DOM.select (`#${group_id}-${idify (x)}`).events ('change')
            .map (x => [x.target.checked, x.target.value])
          )
          : (
            xs.combine (
              DOM.select (`#${group_id}-other`).events ('change')
              .map (D.get ('target'))
              .map (D.get ('checked')),
              DOM.select (`#${group_id}-other_info`).events ('change')
              .map (D.get ('target'))
              .map (D.get ('value'))
              .startWith (''),
            )
            .map (([checked, info]) => [checked, `Other: ${info}`])
          )).startWith (x => [false])
        ) (selection)
      )
      .map (A.filter (A.get (0)))
      .map (A.map (A.get (1)))
    ),
  }
}
