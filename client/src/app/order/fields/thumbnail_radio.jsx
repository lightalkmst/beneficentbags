import xs from 'xstream'

import init from '../../../init'

export default args => sources => {
  const {DOM} = sources

  const {
    group_id,
    selection,
    height,
    width,
  } = args

  const mouseover$ =
    xs.merge (
      ...A.map (x =>
        DOM.select (`#${group_id}-${idify (x)}-thumbnail`).events ('mouseover')
        .mapTo (x)
      ) (selection)
    )
    .startWith (null)

  return {
    DOM: (
      mouseover$.map (x => (
        <div id={group_id}>
          <ul style={{
            width: '200px',
            display: 'inline-block',
            verticalAlign: 'top',
          }}>
            {
              A.map (x => (
                <li style={{height }}>
                  <input type='radio' id={`${group_id}-${idify (x)}`} name={group_id} value={x} />
                  <label for={`${group_id}-${idify (x)}`}>{x}</label>
                  {x == 'Other' && ' - '}
                  {x == 'Other' && <input type='text' id={`${group_id}-other_info`} />}
                </li>
              )) (selection)
            }
          </ul>
          <ul style={{
            width: '200px',
            display: 'inline-block',
          }}>
            {
              A.map (x => (
                <li style={{height }}>
                  <img id={`${group_id}-${idify (x)}-thumbnail`} src={`${x}.jpg`} style={{height, width }} />
                </li>
              )) (selection)
            }
          </ul>
          <div style={{
            width: '200px',
            display: 'inline-block',
            margin: '0px',
            verticalAlign: 'top',
          }}>
            {x && <img src={`${x}.jpg`} style={{height: '300px', width: '300px'}} />}
          </div>
        </div>
      )
    )),
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
