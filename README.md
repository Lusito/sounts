# sounts

[![Minified + gzipped size](https://badgen.net/bundlephobia/minzip/sounts)](https://www.npmjs.com/package/sounts)
[![NPM version](https://badgen.net/npm/v/sounts)](https://www.npmjs.com/package/sounts)
[![License](https://badgen.net/github/license/lusito/sounts)](https://github.com/lusito/sounts/blob/master/LICENSE)
[![Stars](https://badgen.net/github/stars/lusito/sounts)](https://github.com/lusito/sounts)
[![Watchers](https://badgen.net/github/watchers/lusito/sounts)](https://github.com/lusito/sounts)

A tiny helper library for working with the web audio API written in TypeScript.
It has been written to simplify playing sounds in games.
It is not meant as a fully-fledged audio library.

**Features:**
- Playing sounds with and without position and orientation (positional-audio / spatialization)
- A SoundSource (position + orientation) can play multiple sounds
- You can play sounds on channels (if the specified channel already plays a sound, it will be stopped)
- Sounds can of course be played freely (not on a channel)
- It does not abstract away the web audio API. It only simplifies its usage. So you can still use the full power of the web audio API.

**What it doesn't do:**
- Preloading sounds (that's up to you or a different asset manager)
- Manipulating sounds
- Fallback if web audio API is not supported

If you are looking for a more complete solution, you might want to take a look at [howler](https://www.npmjs.com/package/howler).


#### Fair Warning
The compile target of this library is es2015, so if you want to support older browsers, you'll have to ensure that this module is being transpiled to an older es version during your build-process.

### Get started

* [Read the documentation](https://lusito.github.io/sounts/)
* Look at the example (`example/*.ts`).
* Ask questions if the above doesn't clarify something good enough.

### Report issues

Something not working quite as expected? Do you need a feature that has not been implemented yet? Check the [issue tracker](https://github.com/Lusito/sounts/issues) and add a new one if your problem is not already listed. Please try to provide a detailed description of your problem, including the steps to reproduce it.

### Contribute

Awesome! If you would like to contribute with a new feature or submit a bugfix, fork this repo and send a pull request. Please, make sure all the unit tests are passing before submitting and add new ones in case you introduced new features.

### License

**sounts** is licensed under the [zlib/libpng](https://github.com/Lusito/sounts/blob/master/LICENSE), meaning you
can use it free of charge, without strings attached in commercial and non-commercial projects. Credits are appreciated but not mandatory.
