/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAudioContext, createSoundListener, SoundSource } from "../src";
import { Player } from "./Player";
import { DEG_TO_RAD, loadAudioBuffer, main, moveElementTo } from "./utils";
import music from "./assets/music.wav";
import noise from "./assets/noise.wav";

async function setupLeftSource(audioContext: AudioContext) {
    const audioBuffer = await loadAudioBuffer(audioContext, music);

    const position = [main.clientWidth / 4, main.clientHeight / 2] as const;
    moveElementTo(document.getElementById("panner")!, position[0], position[1]);
    const source = new SoundSource(audioContext.destination, {
        panningModel: "HRTF",
        distanceModel: "exponential",
        coneInnerAngle: 40,
        coneOuterAngle: 140,
        coneOuterGain: 0,
        refDistance: 25,
        maxDistance: 105,
        rolloffFactor: 2,
    });
    source.setPosition(position[0], position[1], 0);
    source.setOrientation(0, -1, 0);
    source.play(audioBuffer, { loop: true });
}

async function setupRightSource(audioContext: AudioContext) {
    const audioBuffer = await loadAudioBuffer(audioContext, noise);

    const position = [(main.clientWidth * 3) / 4, main.clientHeight / 2] as const;
    moveElementTo(document.getElementById("panner_nocone")!, position[0], position[1]);
    const source = new SoundSource(audioContext.destination, {
        panningModel: "HRTF",
        distanceModel: "exponential",
        refDistance: 25,
        maxDistance: 105,
        rolloffFactor: 2,
    });
    source.setPosition(position[0], position[1], 0);
    source.play(audioBuffer, { loop: true });
}

function setupListener(audioContext: AudioContext) {
    const player = new Player();
    const listener = createSoundListener(audioContext);
    listener.setPosition(player.x, player.y, 0);
    listener.setUp(0, 0, -1);

    return (deltaTime: number) => {
        const moveAngle = (player.angle + 90) * DEG_TO_RAD;
        let dx = -Math.cos(moveAngle);
        let dy = Math.sin(moveAngle);
        const length = Math.sqrt(dx ** 2 + dy ** 2);
        if (length !== 0) {
            dx /= length;
            dy /= length;
        }

        listener.setForward(dx, -dy, 0);
        listener.setPosition(player.x, player.y, 0);
        player.update(deltaTime);
    };
}

async function init() {
    // Set up audio context
    const audioContext = createAudioContext();

    // Create player and set up listener
    const updateListener = setupListener(audioContext);

    // Set up audio sources
    await setupLeftSource(audioContext);
    await setupRightSource(audioContext);

    // Show example and run an update loop
    main.style.visibility = "visible";
    let lastTime = 0;
    function render(time: number) {
        const delta = time - lastTime;
        lastTime = time;

        updateListener(Math.min(32, delta));

        window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
}

init();
