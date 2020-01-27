# fetch-tx (works in node & web)

Use this to abort multiple/nested fetch operations at once, by using the returned fetch and fetch.abort functions

# installation

npm i fetch-tx

# usage example

```
import { getFetchTx } from 'fetch-tx';

const fetchUrlsTx = getFetchTx();
const urls = ['url1', 'url2', 'url3'];
const promiseArray = urls.map(fetchUrlsTx);
const resArray = await Promise.all(promiseArray);

// use this to abort all fetch operations related to fetchUrlsTx
fetchUrlsTx.abort();
```
