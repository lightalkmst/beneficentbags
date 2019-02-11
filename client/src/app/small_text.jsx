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
                <label for={`${group_id}-${idify (x)}`}>{x}</label>
                {' - '}
                <input type='text' id={`${group_id}-${idify (x)}`} name={group_id} />
              </li>
            )) (selection)
          }
        </ul>
      )
    ),
    selection$: (
      xs.combine (
        ...A.map (x =>
            DOM.select (`#${group_id}-${idify (x)}`).events ('change')
            .map (D.get ('target'))
            .map (D.get ('value'))
        ) (selection)
      )
    ),
  }
}
