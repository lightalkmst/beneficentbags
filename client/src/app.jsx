import xs from 'xstream'

import init from './init'

import form from './app/form'
import submitted from './app/submitted'

export default sources => {
  const {DOM, HTTP} = sources

  const {
    DOM: form_dom$,
    HTTP: form_http$,
    success$,
  } = form (sources)

  const {DOM: submitted_dom$} = submitted ({
    ...sources,
    success$,
  })

  return {
    DOM: (
      xs.merge (
        form_dom$,
        submitted_dom$,
      )
      .map (dom => (
        <div>
          <div id='greeting'>
            Beneficent Bags
          </div>
          {dom}
        </div>
      ))
    ),
    HTTP: (
      form_http$
    ),
  }
}
