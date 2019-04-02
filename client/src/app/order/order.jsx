import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'

import init from '../../init'
import cfg from '../../../config.jsx'

import checkbox from './fields/checkbox'
import radio from './fields/radio'
import thumbnail_radio from './fields/thumbnail_radio'
import small_text from './fields/small_text'
import big_text from './fields/big_text'
import field from './fields/field'
import calculator from './calculator'

export default sources => {
  const {DOM, HTTP} = sources

  const make_field = args =>
    field ({
      ...args,
      type: args.type (args),
    }) (sources)

  const {
    DOM: color_dom$,
    selection$: color_selection$,
  } = make_field ({
    title: 'Color',
    subtext: 'Pick the colors for the bag.',
    type: checkbox,
    group_id: 'color',
    selection: [
      'White',
      'Black',
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Pink',
      'Rainbow',
      'Other',
    ],
  })

  const {
    DOM: style_dom$,
    selection$: style_selection$,
  } = make_field ({
    title: 'Style',
    subtext: 'Pick the weave style for the bag. Mouse over a thumbnail for an expanded view.',
    type: thumbnail_radio,
    height: '50px',
    width: '50px',
    group_id: 'style',
    selection: [
      'Basic',
      // 'Scales',
      'Cable',
      // 'Diamond Lace',
      'Granite',
      // 'Basketweave',
      // 'Braided',
      'Larksfoot Tracks',
      // 'Puff',
      // 'Boxed Puff',
      'Flower Puff',
      // 'Zig-Zag Puff',
      // 'Crossed Stitch',
      'Tunisian Smock',
    ],
  })

  const {
    DOM: drawstring_material_dom$,
    selection$: drawstring_material_selection$,
  } = make_field ({
    title: 'Drawstring Material',
    subtext: 'Pick the material for the drawstring.',
    type: radio,
    group_id: 'drawstring_material',
    selection: [
      'Paracord',
      'Ribbon',
      'Yarn',
      'Handwoven',
    ],
  })

  const {
    DOM: drawstring_color_dom$,
    selection$: drawstring_color_selection$,
  } = make_field ({
    title: 'Drawstring Color',
    subtext: 'Pick only 1 color for non-handwoven drawstrings. Pick up to 4 colors for handwoven drawstrings.',
    type: checkbox,
    group_id: 'drawstring_color',
    selection: [
      'Match Bag',
      'White',
      'Black',
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Pink',
      'Other',
    ],
  })

  const {
    DOM: size_dom$,
    selection$: size_selection$,
  } = make_field ({
    title: 'Approximate Bag Size',
    subtext: 'Specify the dimensions of the deck or largest object to be put in the bag in inches.',
    type: small_text,
    group_id: 'size',
    selection: [
      'Length',
      'Width',
    ],
  })

  const {
    DOM: pocket_dom$,
    selection$: pocket_selection$,
  } = make_field ({
    title: 'Interior Pocket',
    subtext: 'Pick if you want to include a pocket in the interior of the bag.',
    type: radio,
    group_id: 'pocket',
    selection: [
      'Yes',
      'No',
    ],
  })

  const {
    DOM: pocket_size_dom$,
    selection$: pocket_size_selection$,
  } = make_field ({
    title: 'Approximate Pocket Size',
    subtext: 'Specify the dimensions of the pocket inside the bag.',
    type: small_text,
    group_id: 'pocket_size',
    selection: [
      'Length',
      'Width',
    ],
  })

  const {
    DOM: pocket_color_dom$,
    selection$: pocket_color_selection$,
  } = make_field ({
    title: 'Pocket Color',
    subtext: 'Pick the color of the pocket inside the bag.',
    type: radio,
    group_id: 'pocket_color',
    selection: [
      'Match Bag',
      'White',
      'Black',
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Pink',
      'Other',
    ],
  })

  const {
    DOM: pocket_ribbon_color_dom$,
    selection$: pocket_ribbon_color_selection$,
  } = make_field ({
    title: 'Pocket Ribbon Color',
    subtext: 'Pick the color of the ribbon for the pocket inside the bag.',
    type: radio,
    group_id: 'pocket_ribbon_color',
    selection: [
      'White',
      'Black',
      'Red',
      'Orange',
      'Yellow',
      'Green',
      'Blue',
      'Purple',
      'Pink',
      'Other',
    ],
  })

  const {
    DOM: calculator_dom$,
    HTTP: calculator_http$,
  } = calculator ({
    ...sources,
    color_selection$,
    style_selection$,
    drawstring_material_selection$,
    drawstring_color_selection$,
    size_selection$,
    pocket_selection$,
    pocket_size_selection$,
    pocket_color_selection$,
    pocket_ribbon_color_selection$,
  })

  const {
    DOM: additional_requests_dom$,
    selection$: additional_requests_selection$,
  } = make_field ({
    title: 'Additional Customization Requests',
    subtext: (
      <div>
        Describe any stripes, stitch styles not listed, yarn material, decorative stones, etc.
        <br />
        This may affect the final price.
        <br />
        <b>Fiber allergies should be listed here!</b>
      </div>
    ),
    type: big_text,
    group_id: 'additional_requests',
  })

  const {
    DOM: contact_information_dom$,
    selection$: contact_information_selection$,
  } = make_field ({
    title: 'Contact Information',
    subtext: 'Specify your contact information for followup discussion on the order',
    type: small_text,
    group_id: 'additional_requests',
    selection: [
      'First Name',
      'Last Name',
      'E-mail Address',
      'Mailing Address',
    ],
  })

  const submission$ =
    DOM.select ('#submit').events ('click')
    .compose (sampleCombine (
      xs.combine (
        color_selection$,
        style_selection$,
        drawstring_material_selection$,
        drawstring_color_selection$,
        size_selection$,
        pocket_selection$,
        pocket_size_selection$.startWith ([]),
        pocket_color_selection$.startWith (''),
        pocket_ribbon_color_selection$.startWith (''),
        additional_requests_selection$.startWith (''),
        contact_information_selection$,
      )
    ))
    .map (A.get (1))
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
      additional_requests,
      contact_information,
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
      additional_requests,
      contact_information,
    }))
    .map (x => ({
      url: `${cfg.base_url}/bag-order`,
      method: 'POST',
      category: 'submit',
      send: JSON.stringify({
        ...x,
        mode: 'submit',
      }),
      type: 'text/plain',
    }))

  const success$ =
    HTTP.select ('submit').flatten ()
    .map (D.get ('body'))
    .filter (F['='] ('Success'))

  return {
    DOM: (
      xs.merge (
        xs.combine (
          color_dom$,
          style_dom$,
          drawstring_material_dom$,
          drawstring_color_dom$,
          size_dom$,
          pocket_dom$,
          pocket_size_dom$,
          pocket_color_dom$,
          pocket_ribbon_color_dom$,
          additional_requests_dom$,
          contact_information_dom$,
          calculator_dom$,
          pocket_selection$.startWith ('No'),
        )
        .map (([
          color_dom,
          style_dom,
          drawstring_material_dom,
          drawstring_color_dom,
          size_dom,
          pocket_dom,
          pocket_size_dom,
          pocket_color_dom,
          pocket_ribbon_color_dom,
          additional_requests_dom,
          contact_information_dom,
          calculator_dom,
          pocket_selection,
        ]) =>
          <div id='order' style={{background: 'var(--accent-color2)', padding: '20px'}}>
            <h1>Appearance</h1>
            <div>
              {color_dom}
              {style_dom}
              {drawstring_material_dom}
              {drawstring_color_dom}
            </div>
            <h1>Dimensions</h1>
            <div>
              {size_dom}
              {pocket_dom}
              {pocket_selection == 'Yes' && (
                <div>
                  {pocket_size_dom}
                  {pocket_color_dom}
                  {pocket_ribbon_color_dom}
                </div>
              )}
            </div>
            <h1>Additional Information</h1>
            <div>
              {additional_requests_dom}
              {contact_information_dom}
            </div>
            <div>
              {calculator_dom}
            </div>
            <br />
            <button id='submit'>Submit</button>
          </div>
        ),
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
      )
    ),
    HTTP: (
      xs.merge (
        submission$,
        calculator_http$
      )
    ),
    navigation$: xs.never (),
  }
}
