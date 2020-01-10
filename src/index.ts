import nodeF from 'node-fetch'

export function getFetchTx() {
  let controller = new AbortController()
  let signal = controller.signal
  async function fetchTx<Response>(url: string, init?: RequestInit) {
    let res, resJson

    try {
      res = await fetch(url, { ...init, signal })
      resJson = await res.json()
    } catch (err) {
      if (err.name === 'AbortError') console.log('request aborted')
      throw err
    }
    return resJson as Response
  }

  fetchTx.abort = () => {
    controller.abort()
    controller = new AbortController()
    signal = controller.signal
  }
  return fetchTx
}

export function nodeFetchTx(url: string) {
  let res, resJson

  return nodeF(url)
    .then(res => {
      console.log('pure: ', res)
      return res.json()
    })
    .catch(err => {
      if (err.name === 'AbortError') console.log('request aborted')
      throw err
    })
}
