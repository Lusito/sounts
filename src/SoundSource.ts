import { SoundPlayer } from "./SoundPlayer";

/**
 * Options to use for a sound source.
 */
export interface SoundSourceOptions {
    /** The angle, in degrees, of a cone inside of which there will be no volume reduction. */
    coneInnerAngle?: number;

    /** The angle, in degrees, of a cone outside of which the volume will be reduced by a constant value, defined by the coneOuterGain attribute. */
    coneOuterAngle?: number;

    /**
     * The amount of volume reduction outside the cone defined by the coneOuterAngle attribute.
     * Its default value is 0, meaning that no sound can be heard.
     */
    coneOuterGain?: number;

    /** The algorithm to use to reduce the volume of the audio source as it moves away from the listener. The default value is "inverse". */
    distanceModel?: DistanceModelType;

    /** The maximum distance between the audio source and the listener, after which the volume is not reduced any further. */
    maxDistance?: number;

    /** The spatialization algorithm to use to position the audio in 3D space. */
    panningModel?: PanningModelType;

    /**
     * The reference distance for reducing volume as the audio source moves further from the listener.
     * For distances greater than this the volume will be reduced based on {@link rolloffFactor} and {@link distanceModel}.
     */
    refDistance?: number;

    /** How quickly the volume is reduced as the source moves away from the listener. This value is used by all distance models. */
    rolloffFactor?: number;

    /** The amount of gain to apply. If not specified, a GainNode will not be created and you won't be able to change the gain afterwards! */
    gain?: number;
}

/**
 * A sound source is a way to position and orient sounds in the world.
 * If you don't need to position your sounds, you can work with a {@link SoundPlayer} instead.
 */
export class SoundSource extends SoundPlayer<PannerNode> {
    /** The gain node if configured. */
    public readonly gainNode?: GainNode;

    /**
     * @param destination The destination node to connect to.
     * @param options The options to apply.
     */
    public constructor(destination: AudioNode, options?: SoundSourceOptions) {
        super(destination.context.createPanner());

        const gain = options?.gain;
        if (gain !== undefined) {
            this.gainNode = destination.context.createGain();
            this.gainNode.gain.value = gain;
            this.gainNode.connect(destination);
            this.node.connect(this.gainNode);
        } else {
            this.node.connect(destination);
        }

        if (options) {
            if (options.coneInnerAngle !== undefined) this.node.coneInnerAngle = options.coneInnerAngle;
            if (options.coneOuterAngle !== undefined) this.node.coneOuterAngle = options.coneOuterAngle;
            if (options.coneOuterGain !== undefined) this.node.coneOuterGain = options.coneOuterGain;
            if (options.maxDistance !== undefined) this.node.maxDistance = options.maxDistance;
            if (options.refDistance !== undefined) this.node.refDistance = options.refDistance;
            if (options.distanceModel) this.node.distanceModel = options.distanceModel;
            if (options.panningModel) this.node.panningModel = options.panningModel;
            if (options.rolloffFactor !== undefined) this.node.rolloffFactor = options.rolloffFactor;
        }
    }

    /**
     * Set the gain (~volume). Only works if this instance has been configured with again!
     *
     * @param gain The new value.
     */
    public setGain(gain: number) {
        if (!this.gainNode) console.error("Trying to set gain on an emitter, which has not been configured with gain!");
        else this.gainNode.gain.value = gain;
    }

    /**
     * Set the position of this source.
     *
     * @param x The x-coordinate.
     * @param y The y-coordinate.
     * @param z The z-coordinate.
     */
    public setPosition(x: number, y: number, z: number) {
        this.node.positionX.value = x;
        this.node.positionY.value = y;
        this.node.positionZ.value = z;
    }

    /**
     * Set the orientation of this source. Only relevant if you also configured a cone.
     *
     * @param x The x-direction.
     * @param y The y-direction.
     * @param z The z-direction.
     */
    public setOrientation(x: number, y: number, z: number) {
        this.node.orientationX.value = x;
        this.node.orientationY.value = y;
        this.node.orientationZ.value = z;
    }
}
