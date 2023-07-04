import { ScrapperConfig, sleep } from '../config'

if (window.location.href.startsWith('https://www.amazon.in/gp/css/order-history')) {
  const observer = new MutationObserver(callback)
  const config = { attributes: true, childList: true, subtree: true }
  observer.observe(document.body, config)

  async function callback() {
    const viewOrderDetailsSelectors = document.querySelectorAll(
      ScrapperConfig.view_order_details_selector,
    ) as any
    if (viewOrderDetailsSelectors.length > 0) {
      observer.disconnect()
      for (const selector of viewOrderDetailsSelectors) {
        const html = await fetch(selector.href).then((res) => res.text())
        console.log({ html })
        await sleep(1000)
      }
    }
  }
}
