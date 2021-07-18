# Positional Sound

With web audio you can move sound sources and the listener (your virtual head) in 2D or 3D space.
With **sounts** this is easily done:

## Create a SoundListener

This is an optional step if you want to change the position and orientation of the listener. Think of the listener as the camera of the audio world.

If you don't set up a [SoundListener](../api/classes/SoundListener.md), it will be located at (0, 0, 0) with a forward vector of (0, 0, -1) and an up vector of (0, 1, 0).

```typescript
import { createSoundListener } from "sounts";

// ...
const listener = createSoundListener(audioContext);
// ...
listener.setPosition(cameraPos.x, cameraPos.y, cameraPos.z);

// Either set forward and up vector at the same time:
listener.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);

// Or set them independently (it might be interesting if the up vector never changes):
listener.setForward(forward.x, forward.y, forward.z);
listener.setUp(up.x, up.y, up.z);
```

If you are wondering why you'd want to use createSoundListener rather than modifying the audioContext.listener manually: Firefox is still using the legacy API and does not support the standardized API yet. SoundListener abstracts this difference away. 

## Create a SoundSource

Now that you have your listener configured, you want to play sounds in the 2D/3D world.
A [SoundSource](../api/classes/SoundSource.md) extends the [SoundPlayer](../api/classes/SoundPlayer.md) with a position, orientation and other options related to positional audio.

```typescript
import { SoundSource } from "sounts";

// ...
const source = new SoundSource(audioContext.destination);
// ...
source.setPosition(pos.x, pos.y, pos.z);
// ...
const audioBuffer = ...;
source.play(audioBuffer);
```

As you can see, it's really simple to work with a [SoundSource](../api/classes/SoundSource.md). Check out the API documentation to see what other options you have.

## Orienting a SoundSource

When creating a sound source, you have the option of configuring a cone.
Check out the [documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/coneInnerAngle) to learn more about the cone.

If you specify a cone for the [SoundSource](../api/classes/SoundSource.md), you can also set its orientation:

```typescript
import { SoundSource } from "sounts";

// ...
const source = new SoundSource(audioContext.destination, {
    coneInnerAngle: 30,
    coneOuterAngle: 45,
    coneOuterGain: 0
});
// ...
source.setOrientation(dir.x, dir.y, dir.z);
```

## Detailed Example

You might also want to check out the [example code](https://github.com/Lusito/sounts/tree/master/example).
