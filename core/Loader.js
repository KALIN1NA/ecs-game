import { World } from '/ecs/ECS.js';
import { BackgroundComponent } from '/components/BackgroundComponent.js';
import level1Data from '../levels/level1.json';

export class Loader {
    static async loadLevel(levelData, world) {
        try {
            const { texture: backgroundUrl, width, height, x, y } = levelData.background;
            await PIXI.Assets.load([{ alias: 'level1_map', url: backgroundUrl }]);
            const texture = PIXI.Assets.get('level1_map');
            const backgroundComponent = new BackgroundComponent({
                texture: texture.baseTexture,
                width,
                height,
                x,
                y
            });
            const entity = world.createEntity();
            entity.addComponent(backgroundComponent);
            backgroundComponent.view(world.scene);
        } catch (error) {
            console.error(`Error loading texture from ${backgroundUrl}:`, error);
        }
    }
}
