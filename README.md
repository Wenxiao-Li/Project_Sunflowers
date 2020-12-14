# CSE110 @ UCSD: Project Sunflowers

- This is a reworked project that uses React.js as the framework

- The idea of the project is meant to enhance the working efficiency during the online instruction setting and to have fun during study time!

- Currently the MVP(Minimum Viable Product) supports two session model, allows the user to personalize their own block website, view their study history, add/remove friends, and view the leaderboard with interactions.

- This react reworked version is built from this [boilerplate](https://github.com/lxieyang/chrome-extension-boilerplate-react)

##  Environment Setup
### 1. Download packages

- Download [Node.js ](https://nodejs.org/en/download/)
- Download [npm](https://www.npmjs.com/get-npm)
- Test your installation

<p>
Open up your terminal or command prompt, and type the following 

```
node --version
npm --version
``` 

You should be able to check your version.
</p>

<br>
<img src="./assets/Instruction_0.png" style="width:300px;" >
<img src="./assets/Instruction_1.png" style="width:300px;" >

### 2. To Download the files from GitHub

```
git clone https://github.com/Wenxiao-Li/Project_Sunflowers
cd Project_Sunflowers
```

### 3. Install npm packages for project dependencies

Open command prompt in the project directory, and type

```
npm install
```

To install the dependencies for the project

- Note: you need to make sure **python2** is installed in your computer in order to install all the dependencies

### 4. Run the project

Open command prompt in the project directory, and type

```
npm start
```

- Note: this project support **auto reload** feature that reloads the build automatically every time you save some file in your editor.

- Load your extension on Chrome following:

  1. Access `chrome://extensions/`
  2. Check `Developer mode`
  3. Click on `Load unpacked extension`
  4. <img src="./assets/Instruction_2.png" style="width:200px;" >
  5. Select the `build` folder.
  6. <img src="./assets/Instruction_3.png" style="width:200px;" >

- In order to see changes in content scripts or background.html, you need to **refresh the extension**.

- Note: you can run the dev mode on other port as well. Just specify the env var `port` like this:

  ```
  $ PORT=6002 npm run start
  ```

### 5. Structure

All your extension's code must be placed in the `src` folder.

The boilerplate is already prepared to have

- a popup
- an options page
- a background page
<!-- - a new tab page (which replaces the new tab page of your browser).
- home page (Note: this is something I added myself, and is **not part of the standard chrome extension layout, please check 7.2**) -->

Free free to customize these.

### 6. How to modify the project

#### 6.1. Add assets/resources to the project

It seems like only the assets that been specified in the code will be copied to the `build` directory. Therefore, to ensure those files got successfully copied, you should include them in the background scripts: `index.js` under the Background directory (or maybe html I am not sure) like this:

```
import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import '../../assets/img/IMG_1277.jpg';
```

After running `npm start`, you should confirm that those files are present under the `build` folder.

#### 6.2. Add additional entries to the project (ie. home.html)

**_Background information:_** A chrome extension generally has maximum five **entries**: `popup.html`, `options.html`, `background.html`,`newtab.html `,`content-scripts.js`, which **the original boilerplate has already included**. The React.js use webpack to convert its code into standard JavaScript to allow chrome extension to run the extension, however, by default, `create-react-app` only support one entry which is the `index.html`, so to freshly build the project with React, you need to eject the dependencies out, config the webpack under `webpack.config.js` , which is done by the original boilerplate. The original boilerplate also does **custom directory parsing** in `webpack.config.js` , basically instructions on how to convert the project into the `build` directory. These are something that we need to do if we want to add additional entries (basically adding more html page in the build directory, if that's something we want).

To add `home.html`:

1. create directory `src/pages/Home`, and add `home.html`, `index.jsx` under this directory

2. inside `webpack.config.js` add the script for home to entry like this:

   ```js
   {
     …
     entry: {
       newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
       options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
   	…
       home: path.join(__dirname, 'src', 'pages', 'Home', 'index.jsx')
     },
     …
     plugins: [
       …
       new HtmlWebpackPlugin({
         template: path.join(
           __dirname,
           'src',
           'pages',
           'Home',
           'home.html'
         ),
         filename: 'home.html',
         chunks: ['home'],
         cache: false,
       }),
       …
     ]
   }
   ```

   **Caution: Although the home.html can be successfully redirected to and can be loaded in chrome under dev mode, I am not sure whether this will be successfully loaded after deployment**

   **Caution: currently I have only used `window.location.replace('./home.html');` as well as `<a href="home.html"></a>` to redirect pages, only a few attempts using the Router in `'react-router-dom'` is successful, partially due to my inexperience with them. There are suggestions online about how to use them in chrome-extension, can could be tried out in the future.**

#### 6.3. Add Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

### 7. Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

### 8. Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: '123' };
```

_./src/popup.js_

```js
import secrets from 'secrets';
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

### 9. Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)


## FAQ

### 1. Do I have to signin in  order to use the application?
Yes! Since we need the user to personalize the blocklist and allowlist in order to block the specific website, we do require the user to signin for the purpose of using this extension. So, let's signup and use the extension today! 

### 2. Why the notification is not showing up?

When user started or completed the session, the chrome extention would push notifications to the user, and the below image shows the expected feature

<img src="./assets/Instruction_4.png" style="width:200px">

If you fail to see the notifications, it might due to the fact that you block notifications from all sites. In that case, you need to do the following

- On your computer, open Chrome.
- At the top right, click More. Settings.
- Under "Privacy and security," click Site settings.
- Click Notifications.
- Choose to block or allow notifications: Allow or Block all: Turn on or off Sites can ask to send notifications.

credit to [google chrom help](https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DDesktop&hl=en)

