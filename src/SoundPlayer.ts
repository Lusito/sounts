export type PlayOptions = Omit<AudioBufferSourceOptions, "buffer">;

/**
 * Use this to play sounds. If you want to position your sounds, use a {@link SoundSource} instead.
 */
export class SoundPlayer<T extends AudioNode = AudioNode> {
    /**
     * The destination node to connect {@link AudioBufferSourceNode AudioBufferSourceNodes} to.
     * In the case of a {@link SoundSource}, this will be the panner node.
     */
    public readonly node: T;

    /** All free sounds (those not played on a channel). */
    protected readonly sounds: AudioBufferSourceNode[] = [];

    /** All sounds played on a channel. */
    protected readonly channels = new Map<string, AudioBufferSourceNode>();

    /**
     * @param node The destination node to connect {@link AudioBufferSourceNode AudioBufferSourceNodes} to.
     */
    public constructor(node: T) {
        this.node = node;
    }

    /**
     * Creates an {@link AudioBufferSourceNode} and adds an "ended" event listener to its node.
     *
     * @param audioBuffer The buffer to play.
     * @param options The options to apply on playback.
     * @returns The new {@link AudioBufferSourceNode}.
     */
    protected createSourceNode(audioBuffer: AudioBuffer, options?: PlayOptions) {
        const sourceNode = new AudioBufferSourceNode(this.node.context, options);
        sourceNode.buffer = audioBuffer;
        sourceNode.connect(this.node);
        sourceNode.start();

        sourceNode.addEventListener("ended", () => this.onSoundEnded(sourceNode));
        return sourceNode;
    }

    /**
     * Play an audio buffer.
     *
     * @param audioBuffer The buffer to play.
     * @param options The options to apply on playback.
     * @returns A new {@link AudioBufferSourceNode}.
     */
    public play(audioBuffer: AudioBuffer, options?: PlayOptions) {
        const sourceNode = this.createSourceNode(audioBuffer, options);
        this.sounds.push(sourceNode);
        return sourceNode;
    }

    /**
     * Play an audio buffer on a channel.
     * If an {@link AudioBufferSourceNode} is already running on the specified channel, it will be stopped first.
     *
     * @param channel The channel to play the buffer on.
     * @param audioBuffer The buffer to play.
     * @param options The options to apply on playback.
     * @returns A new {@link AudioBufferSourceNode}.
     */
    public playOnChannel(channel: string, audioBuffer: AudioBuffer, options?: PlayOptions) {
        const sourceNode = this.createSourceNode(audioBuffer, options);
        const current = this.channels.get(channel);
        current?.stop();
        this.channels.set(channel, sourceNode);
        return sourceNode;
    }

    /**
     * Stop the {@link AudioBufferSourceNode} on a channel if any is currently playing.
     *
     * @param channel The channel to stop.
     */
    public stopChannel(channel: string) {
        const current = this.channels.get(channel);
        if (current) {
            current.stop();
            this.channels.delete(channel);
        }
    }

    /**
     * Stop all sounds.
     */
    public stopAll() {
        for (const sound of this.sounds) sound.stop();
        this.sounds.length = 0;
        for (const sound of this.channels.values()) sound.stop();
        this.channels.clear();
    }

    /**
     * Will be called when an {@link AudioBufferSourceNode} ended.
     *
     * @param sourceNode The {@link AudioBufferSourceNode} node that ended.
     */
    protected onSoundEnded(sourceNode: AudioBufferSourceNode) {
        const index = this.sounds.indexOf(sourceNode);
        if (index >= 0) {
            this.sounds.splice(index, 1);
            return;
        }
        for (const [key, snd] of this.channels.entries()) {
            if (snd === sourceNode) {
                this.channels.delete(key);
                return;
            }
        }
    }
}
