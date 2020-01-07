# fetch-tx

Use this to abort multiple/nested fetch operations at once, by using the returned fetch and fetch.abort functions

# installation

npm i fetch-tx

# usage example

```
import getfetchTx from 'fetch-tx';

const fetchUrlsTx = getfetchTx();
const urls = ['url1', 'url2', 'url3']
const promiseArray = urls.map(async url => await fetchUrlsTx(url));
const resArray = await Promise.all(promiseArray);

// use this to abort all fetch operations
fetchUrlsTx.abort()
```