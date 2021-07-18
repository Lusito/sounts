---
home: true
heroText: sounts
tagline: A tiny helper library for working with the web audio API written in TypeScript.
actionText: Get Started →
actionLink: /guide/
features:
- title: Simple API
  details: sounts does not abstract away the web audio API. It only simplifies its usage. So you can still use the full power of the web audio API.
- title: Positional Sound
  details: Playing sounds with and without position and orientation. Perfect for developing games.
- title: Typesafe
  details: sounts makes use of TypeScript to ensure a pleasant and safe development experience!
footer: zlib/libpng License
---

## What is sounts?

A tiny helper library for working with the web audio API written in TypeScript.
It has been written to simplify playing sounds in games.
It is not meant as a fully-fledged audio library.

**What it doesn't do:**
- Preloading sounds (that's up to you or a different asset manager)
- Manipulating sounds
- Fallback if web audio API is not supported

If you are looking for a more complete solution, you might want to take a look at [howler](https://www.npmjs.com/package/howler).

## Goals of this Project

I am a purist. If possible, I like to work with the tools the browser gives me. I don't need an npm package to trim text, filter arrays, etc..

### Existing libraries

While looking at existing libraries, I mostly found packages, that have not been updated in almost a decade, had no TypeScript support, weighed a ton or had a lot of dependencies.

The only library I deemed worthy of considering was [howler](https://www.npmjs.com/package/howler). It's actively maintained, has type definitions via `@types/howler` and `0` dependencies.

But two aspects remained (If those don't concern you, you should consider howler):
- It's big: [9.5kB minified + gzipped](https://bundlephobia.com/package/howler).
- And it abstracts a lot of the web audio part away.

### Working with Raw Web Audio API
After that, I took a look at web audio API tutorials, most of which have been written almost a decade ago. Here are the top 3:

- [Getting Started with Web Audio API](https://www.html5rocks.com/en/tutorials/webaudio/intro/)
- [Developing Game Audio with the Web Audio API](https://www.html5rocks.com/en/tutorials/webaudio/games/)
- [Web audio spatialization basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)

That's a lot to read and a lot to adjust for, as the API has changed a bit since then. Even JavaScript has changed quite a lot since then. 

Those tutorials are still worth a read, at least for the theory. You'll have to adjust the code a bit to work with the current standard.

### Deciding to Write Something New

So, here I am again starting the same old thought: "*There has to be a better way...*" (... to get started with web audio).

The goal of this library is to have a simple starting point for writing positional audio code with the web audio API without having to dig into old tutorials and convert all the legacy code examples to the new standard.

You can start writing code with **sounts** and as you learn more about the web audio API you can extend your code, as **sounts** does not hide the web audio API from you.

## Liberal License

Thanks to its [zlib/libpng](https://github.com/Lusito/sounts/blob/master/LICENSE) license, users have the freedom to use it, modify it and redistribute as they please. Commercial purposes are perfectly allowed.
