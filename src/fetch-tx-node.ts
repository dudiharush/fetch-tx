import nodeFetch, { RequestInit } from 'node-fetch'
import AbortCtrlr from 'abort-controller'

export function getFetchTx() {
  let controller = new AbortCtrlr()
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
    controller = new AbortCtrlr()
    signal = controller.signal
  }
  return fetchTx
}
