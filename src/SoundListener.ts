/* eslint-disable max-classes-per-file */

/**
 * Used to position and orient the AudioListener cross-browser.
 *
 * @see {@link createSoundListener}
 */
export abstract class SoundListener {
    public readonly node: AudioListener;

    /**
     * @param context The audio context to use.
     */
    public constructor(context: AudioContext) {
        this.node = context.listener;
    }

    /**
     * Set the position of this listener.
     * The default is (0, 0, 0).
     *
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param z The z-coordinate.
     */
    public abstract setPosition(x: number, y: number, z: number): void;

    /**
     * Set the forward direction of this listener.
     * The default is (0, 0, -1).
     *
     * @param x The x-direction.
     * @param y The y-direction.
     * @param z The z-direction.
     */
    public abstract setForward(x: number, y: number, z: number): void;

    /**
     * Set the up direction of this listener.
     * The default is (0, 1, 0).
     *
     * @param x The x-direction.
     * @param y The y-direction.
     * @param z The z-direction.
     */
    public abstract setUp(x: number, y: number, z: number): void;

    /**
     * Set the forward and up direction of this listener.
     * The defaults are (0, 0, -1) and (0, 1, 0).
     *
     * @param forwardX The forward x-direction.
     * @param forwardY The forward Y-direction.
     * @param forwardZ The forward Z-direction.
     * @param upX The up x-direction.
     * @param upY The up y-direction.
     * @param upZ The up z-direction.
     */
    public abstract setOrientation(
        forwardX: number,
        forwardY: number,
        forwardZ: number,
        upX: number,
        upY: number,
        upZ: number
    ): void;
}

/**
 * Create a sound listener depending on browser support.
 *
 * @param context The audio context to use.
 * @returns A new SoundListener instance.
 * @throws When neither standard nor legacy support was detected for AudioListener.
 */
export function createSoundListener(context: AudioContext): SoundListener {
    if ("forwardX" in AudioListener.prototype) return new StandardSoundListener(context);
    if ("setOrientation" in AudioListener.prototype) return new LegacySoundListener(context);
    throw new Error("Neither standard nor legacy support was detected for AudioListener");
}

class StandardSoundListener extends SoundListener {
    public setPosition(x: number, y: number, z: number) {
        this.node.positionX.value = x;
        this.node.positionY.value = y;
        this.node.positionZ.value = z;
    }

    public override setForward(x: number, y: number, z: number) {
        this.node.forwardX.value = x;
        this.node.forwardY.value = y;
        this.node.forwardZ.value = z;
    }

    public override setUp(x: number, y: number, z: number) {
        this.node.upX.value = x;
        this.node.upY.value = y;
        this.node.upZ.value = z;
    }

    public override setOrientation(
        forwardX: number,
        forwardY: number,
        forwardZ: number,
        upX: number,
        upY: number,
        upZ: number
    ) {
        this.setForward(forwardX, forwardY, forwardZ);
        this.setUp(upX, upY, upZ);
    }
}

// Firefox does not support forwardX/Y/Z, upX/Y/Z and positionX/Y/Z, so we use setOrientation and setPosition
class LegacySoundListener extends SoundListener {
    private up: [number, number, number] = [0, 1, 0];

    private forward: [number, number, number] = [0, 0, -1];

    public setPosition(x: number, y: number, z: number) {
        this.node.setPosition(x, y, z);
    }

    public setForward(x: number, y: number, z: number) {
        this.forward = [x, y, z];
        this.node.setOrientation(x, y, z, this.up[0], this.up[1], this.up[2]);
    }

    public setUp(x: number, y: number, z: number) {
        this.up = [x, y, z];
        this.node.setOrientation(this.forward[0], this.forward[1], this.forward[2], x, y, z);
    }

    public override setOrientation(
        forwardX: number,
        forwardY: number,
        forwardZ: number,
        upX: number,
        upY: number,
        upZ: number
    ) {
        this.up = [upX, upY, upZ];
        this.forward = [forwardX, forwardY, forwardZ];
        this.node.setOrientation(forwardX, forwardY, forwardZ, upX, upY, upZ);
    }
}
