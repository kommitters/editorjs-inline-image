# EditorJS Unsplash Inline Image Tool

![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)
![](https://badgen.net/badge/Editor.js/v2.0/blue)
[![Coverage Status](https://coveralls.io/repos/github/kommitters/editorjs-inline-image/badge.svg)](https://coveralls.io/github/kommitters/editorjs-inline-image)
[![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/6469/badge)](https://bestpractices.coreinfrastructure.org/projects/6469)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/kommitters/editorjs-inline-image/badge)](https://api.securityscorecards.dev/projects/github.com/kommitters/editorjs-inline-image)

Image tool for [Editor.js](https://editorjs.io) that enables you to embed images from [Unsplash](https://unsplash.com/), blobs, or URLs directly into your content.
![](assets/demo.gif)

## Notes

Requires a proxy for the Unsplash API to avoid exposing the Unsplash Access Key on the client-side. See [Proxy for Unsplash API](proxy_api.md) for more information.

Built following the [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines).

Extends the functionality of [simple-image](https://github.com/editor-js/simple-image).

## Installation

You can install the tool via npm or load it from a CDN.

### Install via NPM
Get the package
```shell
$ npm i --save-dev editorjs-inline-image
```

Include module at your application

```javascript
import InlineImage from 'editorjs-inline-image';
```

### Load from CDN

You can load a specific version of the package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/editorjs-inline-image).

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-inline-image"></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
const editor = EditorJS({
  tools: {
      image: {
        class: InlineImage,
        inlineToolbar: true,
        config: {
          embed: {
            display: true,
          },
          unsplash: {
            appName: 'your_app_name',
            apiUrl: 'https://your-proxy-api-url.com',
            maxResults: 30,
            imageParams: {
              q:85,
              w:1500,
            }
          }
        }
      }
  }
});
```

## Config Params

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| embed          | `{display: boolean}` | You could display or not the embed tab, If you don't fill the embed config by default the value is set on `true`. |
| unsplash       | `{appName: string, apiUrl: string, maxResults: Number, imageParams: Object}`  | Config for **Unsplash API**. Contains 3 fields: <br><br> **appName**: Unsplash `Application Name`. <br><br> **apiUrl**: URL of the Proxy for Unsplash API. <br><br> **maxResults**: Max number of images per search (default 30). <br><br> **imageParams**: Additional configuration parameters for image quality and dimensions. See [Dynamically resizable images](https://unsplash.com/documentation#dynamically-resizable-images) for more information. |

## Tool's tunes

1. Add border

2. Stretch to full-width

3. Add background

## Output data

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| url            | `string`  | Image's url                     |
| caption        | `string`  | Image's caption                 |
| withBorder     | `boolean` | Add border to image             |
| withBackground | `boolean` | Add background          |
| stretched      | `boolean` | Stretch image to screen's width |
| unsplash       | `{author: string, profileLink: string}` | Unsplash image author information. <br><br> **author**: Author's name. <br><br> **profileLink**: Unsplash porfile link.

**Image**

```json
{
    "type" : "image",
    "data" : {
        "url" : "https://www.example.com/image.jpg",
        "caption" : "An image",
        "withBorder" : false,
        "withBackground" : false,
        "stretched" : true
    }
}
```

**Unsplash image**

```json
{
  "type": "image",
  "data": {
    "url": "https://images.unsplash.com/photo-xxxxxxxxxxxxxxxxx",
    "caption": "An image from Unsplash",
    "withBorder": false,
    "withBackground": true,
    "stretched": false,
    "unsplash": {
      "author": "John Doe",
      "profileLink": "https://unsplash.com/@john_doe_fake"
    }
  }
}
```

## Development

**Development mode**
```shell
$ yarn build:dev
```

**Production release**
1. Create a production bundle
```shell
$ yarn build
```

2. Commit `dist/bundle.js`

**Run tests**
```shell
$ yarn test
```

## Code of conduct
We welcome everyone to contribute. Make sure you have read the [CODE_OF_CONDUCT][coc] before.

## Contributing
For information on how to contribute, please refer to our [CONTRIBUTING][contributing] guide.

## Changelog
Features and bug fixes are listed in the [CHANGELOG][changelog] file.

## License
This library is licensed under an MIT license. See [LICENSE][license] for details.

## Acknowledgements
Made with 💙 by [kommitters Open Source](https://kommit.co)

[license]: https://github.com/kommitters/editorjs-inline-image/blob/master/LICENSE
[coc]: https://github.com/kommitters/editorjs-inline-image/blob/master/CODE_OF_CONDUCT.md
[changelog]: https://github.com/kommitters/editorjs-inline-image/blob/master/CHANGELOG.md
[contributing]: https://github.com/kommitters/editorjs-inline-image/blob/master/CONTRIBUTING.md
