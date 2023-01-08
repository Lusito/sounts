# Getting Started

The following shows you the simplest way to use **sounts**.

Notice how you are still using native web audio API constructs. You will always have access to all nodes via the **sounts** API, so you can do all the stuff you can do with the normal web audio API even if it's not a feature of **sounts**.

## Create an AudioContext

First off, you'll need an instance of AudioContext. You can either create one yourself or use the built-in helper function `createAudioContext`:

```typescript
import { createAudioContext } from "sounts";

const audioContext = createAudioContext();
```

The helper function has the benefit, that it will automatically add a click & keydown listener to resume your audio context as soon as the user interacts with your webpage. This is needed, as some browsers like chrome might suspend your audio context at the start.

## Load an AudioBuffer

Next, you'll need to load an AudioBuffer. You probably want to use a loader for that.

If you don't have a loader yet, you can take this one, which is written with plain JavaScript features:

```typescript
async function loadAudioBuffer(audioContext: AudioContext, path: string) {
    const response = await fetch(path);
    const data = await response.arrayBuffer();
    return audioContext.decodeAudioData(data);
}

// ...
async function init() {
    // ...
    const audioBuffer = loadAudioBuffer(audioContext, "/assets/explosion.wav");
}
```

## Create a SoundPlayer and Play a Sound

The easiest way to play (non-positional) sounds is using the [SoundPlayer](../api/classes/SoundPlayer.md) class:

```typescript
import { SoundPlayer } from "sounts";

// ...
const player = new SoundPlayer(audioContext.destination);
// ...
const audioBuffer = ...;
const sourceNode = player.play(audioBuffer);
```

You want to add position, volume and more to your sounds? Check out the other tutorials.

## Stop a Sound

The `play()` method of [SoundPlayer](../api/classes/SoundPlayer.md) returns an `AudioBufferSourceNode`, which you can use to stop the sound:

```typescript
const sourceNode = player.play(audioBuffer);
// ...
sourceNode.stop();
```
