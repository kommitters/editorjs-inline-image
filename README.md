![](https://badgen.net/badge/Editor.js/v2.0/blue)

# EditorJS Inline Image Tool

Image tool for [Editor.js](https://editorjs.io).

Embed images from image files, URLs or [Unsplash](https://unsplash.com/).

## Notes

Requires no server-side uploader.

Built following the [Unsplash API Guidelines](https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines).

Extends the functionality of [simple-image](https://github.com/editor-js/simple-image).

## Installation

### Install via NPM
Get the package
```shell
$ npm i --save-dev editorjs-inline-image
```

Include module at your application

```javascript
import InlineImage from 'editorjs-inline-image';
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
          unsplash: {
            appName: 'your_app_name',
            clientId: 'your_client_id'
          }
        }
      }
  }
});
```

## Config Params

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| unsplash       | `{appName: string, clientId: string, maxResults: string}`  | Config for **Unsplash API**. Contains 3 fields: <br><br> **appName**: Unspalsh `Application Name`. <br><br> **clientId**: Unsplash `Access Key`. <br><br> **maxResults**: Max number of images per search (default 30).                    |

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
