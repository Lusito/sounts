/* eslint-disable jsdoc/require-jsdoc */

import { DEG_TO_RAD, main, moveElementTo } from "./utils";

type Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
export class Player {
    public element = document.getElementById("listener")!;
    public x = main.clientWidth / 2;
    public y = main.clientHeight / 2;
    public angle = 0;

    private readonly keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
    };

    public constructor() {
        moveElementTo(this.element, this.x, this.y);

        window.addEventListener("keydown", (e) => {
            if (e.code in this.keys) {
                this.keys[e.code as Keys] = true;
                e.preventDefault();
                e.stopPropagation();
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.code in this.keys) {
                this.keys[e.code as Keys] = false;
                e.preventDefault();
                e.stopPropagation();
            }
        });
    }

    public update(deltaTime: number) {
        let deltaAngle = 0;
        if (this.keys.ArrowRight) deltaAngle += 1;
        if (this.keys.ArrowLeft) deltaAngle -= 1;
        this.angle = (360 + this.angle + deltaTime * deltaAngle * 0.2) % 360;
        this.element.style.transform = `rotate(${this.angle}deg)`;

        if ((this.keys.ArrowUp || this.keys.ArrowDown) && this.keys.ArrowUp !== this.keys.ArrowDown) {
            const moveAngle = (this.keys.ArrowUp ? this.angle - 90 : this.angle + 90) * DEG_TO_RAD;
            const dx = Math.cos(moveAngle);
            const dy = Math.sin(moveAngle);
            const speed = deltaTime * 0.1;
            this.x = Math.min(main.clientWidth - 50, Math.max(50, this.x + dx * speed));
            this.y = Math.min(main.clientHeight - 50, Math.max(50, this.y + dy * speed));
            moveElementTo(this.element, this.x, this.y);
        }
    }
}
