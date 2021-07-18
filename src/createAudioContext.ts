/**
 * Creates a new audio context and resumes it once the user interacts with the window (via click or keypress).
 *
 * @param options The options passed to the audio context.
 * @returns A new AudioContext instance.
 */
export function createAudioContext(options?: AudioContextOptions) {
    const context = new AudioContext(options);
    if (context.state === "suspended") {
        const listener = () => {
            context.resume();
            window.removeEventListener("click", listener);
            window.removeEventListener("keydown", listener);
        };
        window.addEventListener("click", listener);
        window.addEventListener("keydown", listener);
    }
    return context;
}
