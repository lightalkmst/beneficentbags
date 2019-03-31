import xs from 'xstream'

import init from './init'

import home from './app/home/home'
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
    DOM: home_dom$,
    // HTTP: home_dom$,
    navigation$: home_navigation$,
  } = home (sources)

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
    .startWith ('home')

  return {
    DOM: (
      xs.combine (
        home_dom$,
        order_dom$,
        navigation$,
      )
      .map (([
        home_dom,
        order_dom,
        navigation,
      ]) => {
        const dom = {
          home_dom,
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
            <br />
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
