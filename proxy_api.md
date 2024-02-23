# Proxy for Unsplash API

To use the plugin, it is required to create a proxy to the Unsplash API to avoid exposing your Unsplash Access Key on the client-side.

The proxy simply forwards requests to the Unsplash API and returns the response to the client.

> [!NOTE]
> You decide where to deploy your proxy server.

## Why?

This proxy server will prevent users from seeing your Unsplash Access Key in your HTTP requests.

Also, it complies with the [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines).

## How to create a proxy?

You can use the following code repository: [unsplash-api-proxy](https://github.com/ayltai/unsplash-api-proxy).

Check out the [`app.js`](https://github.com/ayltai/unsplash-api-proxy/blob/master/app.js) file to see how the proxy server is implemented.

> [!IMPORTANT]
> A user might still make requests using your proxy server.
> A precaution you can take to prevent this is to restrict requests from other domains.

To only allow requests from your domain(s), add the CORS configuration. Here's the resulting code:

```javascript
const app = require('express')();
const proxy = require('express-http-proxy');
require('dotenv').config(); // for loading environment variables from a .env file

const allowedOrigins = ['https://my-website.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    next();
  } else {
    return res.status(403).send('Access denied');
  }
});

app.use('/', proxy('https://api.unsplash.com', {
  proxyReqPathResolver : request => {
    const parts = request.url.split('?');

    return `${parts[0]}?client_id=${process.env.UNSPLASH_ACCESS_KEY}` + (parts.length ? `&${parts[1]}` : '');
  },
}));

app.listen(process.env.PORT || 8080, '0.0.0.0');
```

That's it! You can now use the Unsplash API without exposing your Unsplash Access Key.
