import nodeFetch, { RequestInit } from 'node-fetch'
import AbortCtlr from 'abort-controller'

export function getFetchTx() {
  let controller = new AbortCtlr()
  let signal = controller.signal
  const fetchData = fetch || nodeFetch
  async function fetchTx<Response>(url: string, init?: RequestInit) {
    let res, resJson

    try {
      //@ts-ignore
      res = await fetchData(url, { ...init, signal })
      console.log('response: ', res)
      resJson = await res.json()
    } catch (err) {
      if (err.name === 'AbortError') console.log('request aborted')
      throw err
    }
    return resJson as Response
  }
  fetchTx.abort = () => {
    controller.abort()
    controller = new AbortCtlr()
    signal = controller.signal
  }
  return fetchTx
}
