# Channels

Channels are a way of avoiding to play conflicting sounds.

Imagine you have an announcer (someone that gives you information) and you let it play a message to the user. Now, for some reason, another message is being played to the user. He will have to listen to two talkers at the same time, which is not something you can expect of your users.

To solve this issue, both [SoundPlayer](../api/classes/SoundPlayer.md) and [SoundSource](../api/classes/SoundSource.md) (which extends SoundPlayer) allow you to play sounds on channels (by name).

If a sound is already being played on a channel, it will be stopped before playing the new one.

## Example


```typescript
import { SoundPlayer } from "sounts";

// ...
const player = new SoundPlayer(audioContext.destination);
// ...
const audioBuffer = ...;
player.playOnChannel("announcer", audioBuffer);
player.playOnChannel("music", musicAudioBuffer);

// later maybe:
player.stopChannel("announcer");
```
