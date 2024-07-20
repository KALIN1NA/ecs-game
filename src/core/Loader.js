import {World} from '/src/ecs/ECS.js';
import {BackgroundComponent} from '/src/components/BackgroundComponent.js';
import level1Data from '../../levels/level1.json';
import * as PIXI from 'pixijs'

export class Loader {
    static async loadLevel(levelData, world, scene) {
        const {texture: backgroundUrl, width, height, x, y} = levelData.background;
        try {
            await PIXI.Assets.load({alias: ['level1_map'], src: "/assets/images/" + backgroundUrl});
            const texture = PIXI.Assets.get('level1_map');
            console.log(texture)
            console.log('Available assets:', PIXI.Assets.cache);
            const backgroundComponent = new BackgroundComponent({
                texture: texture.baseTexture,
                width,
                height,
                x,
                y
            });
            const entity = world.createEntity();
            entity.addComponent(backgroundComponent);
            backgroundComponent.view();
        } catch (error) {
            console.error(`Error loading texture from ${backgroundUrl}:`, error);
        }
    }
}
