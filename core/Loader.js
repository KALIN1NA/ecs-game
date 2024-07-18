import * as PIXI from 'pixi.js';

export class Loader {
    constructor() {
        this.resources = {};
    }

    async loadLevel(levelData) {
        return new Promise((resolve, reject) => {
            PIXI.Loader.shared
                .add([
                    { name: 'background', url: `assets/images/${levelData.background.texture}` },
                ])
                .load((_, resources) => {
                    this.resources = resources;
                    resolve();
                });
        });
    }
}