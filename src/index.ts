export function getFetchTx() {
  let controller = new AbortController();
  let signal = controller.signal;
    async function fetchTx<T> (url: string) {
    let res, resJson;
    try {
      res = await fetch(url, { signal });
      resJson = await res.json();
    } catch (err) {
      if (err.name === "AbortError") console.log("request aborted");
    }
    return resJson as T;
  };
  fetchTx.abort = controller.abort;
  return fetchTx;
}