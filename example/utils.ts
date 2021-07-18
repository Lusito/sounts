/* eslint-disable jsdoc/require-jsdoc */

export const main = document.querySelector("main")!;

export function moveElementTo(element: HTMLElement, x: number, y: number) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

export const DEG_TO_RAD = Math.PI / 180;

export async function loadAudioBuffer(audioContext: AudioContext, path: string) {
    const response = await fetch(path);
    const data = await response.arrayBuffer();
    return audioContext.decodeAudioData(data);
}
