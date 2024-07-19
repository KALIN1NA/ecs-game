import { World } from '/ecs/ECS.js';
import { BackgroundComponent } from '/components/BackgroundComponent.js';

export class Loader {
    static async loadLevel(levelData, world) {
        try {
            await PIXI.Assets.load([{ alias: 'level1_map', src: '/assets/images/first_level_map.jpg' }]);
            const texture = PIXI.Assets.get('level1_map');
            const backgroundComponent = new BackgroundComponent({ texture });
            const entity = world.createEntity();
            entity.addComponent(backgroundComponent);
        } catch (error) {
            console.error('Error loading texture:', error);
        }
    }
}
