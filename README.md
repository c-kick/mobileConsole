<img src="https://code.hnldesign.nl/mobile-console/logo.png">

# mobileConsole
mobileConsole<sup>v2</sup> is a further refinement (complete rewrite) of a JavaScript console-emulator I wrote, which provides a way to view console output on devices that don't support this (visually) natively/easily (such as Safari on iOS). It extends JavaScript's native console to display a visual (HTML) console inside the webpage.

## About

mobileConsole reroutes the native <code>window.console</code> output and renders it to HTML. This means that you can include mobileConsole in any project, without having to rewrite any existing logging; mobileConsole 'hijacks' all console methods, such as console.log, console.warn, etc. It also outputs global window.onerror errors and sports a command line input. Oh, and it even has dark color scheme support!

See it in action at https://code.hnldesign.nl/demo/hnl.MobileConsole.v2.html. You can freely resize the console by (touchmove/click-)dragging the top bar, or tap/click it once to minimize/restore the console. Clear the console by using the recycle-bin icon.

## Usage

Include the JavaScript file into the <code>&lt;head&gt;</code> section of your page, and make sure it's the **first** script loaded (or at least *before* other scripts of which you need to be able to see console logging). A separate CSS is required for proper styling/theming/positioning of the console. This file is loaded through JavaScript, so you only need to include the js file in your project. Just make sure the CSS file resides in the same path as the JavaScript file.

### Via CDN (jsDelivr)

You can include https://cdn.jsdelivr.net/gh/c-kick/mobileConsole/hnl.mobileconsole.min.js, which always gets you the latest version. The required CSS is loaded automatically (from the jsDelivr CDN) by the script.

## Acknowledgements
mobileConsolev2 uses stacktracejs (bundled) for resolving stack traces across all browsers.
