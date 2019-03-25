import xs from 'xstream'

import init from './init'

import order from './app/order/order'

export default sources => {
  const {DOM, HTTP} = sources

  const pages = [
    'home',
    'gallery',
    'order',
    'contact',
    'about',
  ]

  const {
    DOM: order_dom$,
    HTTP: order_http$,
    navigation$: order_navigation$,
  } = order (sources)

  const navigation$ =
    xs.merge (
      ...A.map (x =>
        DOM.select (`#navbar_${x}`).events ('click')
        .map (F.tap (x => x.preventDefault ()))
        .mapTo (x)
      ) (pages),
      order_navigation$,
    )
    .startWith ('order')

  return {
    DOM: (
      xs.combine (
        order_dom$,
        navigation$,
      )
      .map (([
        order_dom,
        navigation,
      ]) => {
        const dom = {
          order_dom,
        }[`${navigation}_dom`]

        return (
          <div>
            <div id='greeting'>
              Beneficent Bags
            </div>
            <div>
              <ul className='navbar'>
                {
                  A.map (x => (
                    <li style={{width: `${100 / A.length (pages)}%`}}>
                      <a id={`navbar_${x}`} href=''>{x}</a>
                    </li>
                  )) (pages)
                }
              </ul>
            </div>
            <br style={{clear: 'left'}}/>
            {dom}
          </div>
        )
      })
    ),
    HTTP: (
      order_http$
    ),
  }
}
