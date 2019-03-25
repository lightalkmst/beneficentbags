import xs from 'xstream'

import init from '../../../init'

export default args => sources => {
  const {DOM} = sources

  const {
    title,
    subtext,
    type,
  } = args

  const {
    DOM: type_dom$,
    selection$,
  } = type(sources)

  return {
    DOM: (
      type_dom$.map(type_dom => (
        <div>
          <h2>{title}</h2>
          {typeof subtext == 'string' && <div>{subtext}</div>}
          {typeof subtext != 'string' && subtext}
          {type_dom}
        </div>
      ))
    ),
    selection$,
  }
}
