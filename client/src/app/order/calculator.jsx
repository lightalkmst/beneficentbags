import xs from 'xstream'

import init from '../../init'
import cfg from '../../../config.jsx'

export default sources => {
  const {
    HTTP,
    color_selection$: color$,
    style_selection$: style$,
    drawstring_material_selection$: drawstring_material$,
    drawstring_color_selection$: drawstring_color$,
    size_selection$: size$,
    pocket_selection$: pocket$,
    pocket_size_selection$: pocket_size$,
    pocket_color_selection$: pocket_color$,
    pocket_ribbon_color_selection$: pocket_ribbon_color$,
  } = sources

  const cost$ =
    HTTP.select ('calculate').flatten ()
    .map (D.get ('body'))

  return {
    DOM: (
      cost$.map (x => <div>This bag will cost approximately ${x}.</div>)
      .startWith (<div>A cost estimate will be given once the form is completely filled.</div>)
    ),
    HTTP: (
      xs.combine (
        color$,
        style$,
        drawstring_material$,
        drawstring_color$,
        size$,
        pocket$,
        pocket_size$.startWith ([]),
        pocket_color$.startWith (''),
        pocket_ribbon_color$.startWith (''),
      )
      .map (([
        color,
        style,
        drawstring_material,
        drawstring_color,
        size,
        pocket,
        pocket_size,
        pocket_color,
        pocket_ribbon_color,
      ]) => ({
        color,
        style,
        drawstring_material,
        drawstring_color,
        size,
        pocket,
        pocket_size,
        pocket_color,
        pocket_ribbon_color,
      }))
      .map (x => ({
        url: `${cfg.base_url}/bag-order`,
        method: 'POST',
        category: 'calculate',
        send: JSON.stringify({
          ...x,
          mode: 'calculate',
        }),
        type: 'text/plain',
      }))
    ),
  }
}
