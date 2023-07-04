import { ScrapperConfig } from '../config'

if (window.location.href.startsWith('https://www.amazon.in/gp/css/order-history')) {
  const observer = new MutationObserver(callback)
  const config = { attributes: true, childList: true, subtree: true }
  observer.observe(document.body, config)
  async function callback() {
    let view_order_details_selectors = document.querySelectorAll(
      ScrapperConfig.view_order_details_selector,
    ) as any
    if (view_order_details_selectors.length > 0) {
      observer.disconnect()
      let i = 0
      while (view_order_details_selectors.length > i) {
        const html = await fetch(view_order_details_selectors[i].href).then((res) => res.text())
        console.log({ html })
        i++
      }
    }
  }
}

export {}
