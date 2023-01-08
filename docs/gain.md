# Gain / Volume

You might be looking for a way to change the main volume or the volume of individual sound sources.
This can be done using gain.

## Gain is not Volume
In short: [Gain controls how loud something is before it gets processed](https://www.musicianonamission.com/gain-vs-volume/).

In order to understand what that means, we need to understand how web audio processes sound:

## Connecting Nodes
In web audio you connect nodes to other nodes until you finally end up at the AudioContext destination.

A simple connection flow without positional audio and without volume/gain control might look like this:
```
AudioBufferSourceNode -> AudioContext.destination
```

Once you add positional audio, it might look like this:
```
(AudioBufferSourceNode -> PannerNode) -> AudioContext.destination
```

The brackets represent the nodes within the [SoundSource](../api/classes/SoundSource.md), so you have one context, but multiple PannerNodes connected to this context.

Now, in order to control the global "volume", we need to insert a GainNode right before the AudioContext:

```
AudioBufferSourceNode -> GainNode -> AudioContext.destination
```

If we have positional audio, we might have a GainNode after the PannerNode as well:

```
(AudioBufferSourceNode -> PannerNode -> GainNode) -> GainNode -> AudioContext.destination
```

In this scenario, you can change the gain of the positioned sound as well as the overall "main volume".

## Adding Global/Main Volume

As we learned above, we need to introduce a GainNode in order to configure the global "volume".

### Without Positional Audio

```typescript
import { SoundPlayer } from "sounts";

// ...
const mainVolume = audioContext.createGain();
// connect main volume to audioContext.destination
mainVolume.connect(audioContext.destination);
// Connect the player to mainVolume instead of audioContext.destination!
const player = new SoundPlayer(mainVolume);

// Set the gain value (0-1):
mainVolume.gain.value = 0.5;
```
### With Positional Audio

```typescript
import { SoundSource } from "sounts";

// ...
const mainVolume = audioContext.createGain();
// connect main volume to audioContext.destination
mainVolume.connect(audioContext.destination);

// Connect the sound source to mainVolume instead of audioContext.destination!
// Also pass a gain property to the sound source
const source = new SoundSource(mainVolume, { gain: 0.75 });
// Later you can change the gain:
source.setGain(0.5);
```

By passing in a gain value as option to the [SoundSource](../api/classes/SoundSource.md) constructor, a gain node will automatically be added to the source.

**Note**, that you can't call setGain unless you passed a gain value in the options parameter.

### Summary

As you can see, it's quite easy to configure GainNodes. You can even have different GainNodes for different sources and players. For example one for main volume, one music, one for all sound effects and one for each sound source individually.
