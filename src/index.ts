import nodeFetch, { RequestInit } from 'node-fetch'
import AbortCtlr from 'abort-controller'

export function getFetchTx() {
  let controller = new AbortCtlr()
  let signal = controller.signal
  async function fetchTx<Response>(url: string, init?: RequestInit) {
    let res, resJson

    try {
      res = await nodeFetch(url, { ...init, signal })
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
