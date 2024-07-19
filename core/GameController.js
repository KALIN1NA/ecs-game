import { World } from '/ecs/ECS.js';
import { BackgroundSystem } from '/systems/BackgroundSystem.js';
import { Loader } from '/core/Loader.js';
import { LevelParser } from '/core/LevelParser.js';
import { Renderer } from '/utils/Renderer.js';

export class GameController {
    static async start() {
        let levelData;
        try {
            levelData = await LevelParser.parse('../levels/level1.json');
        } catch (error) {
            console.error('Error loading level:', error);
            return;
        }

        const app = new PIXI.Application();
        await app.init({
            background: '#000000',
            width: window.innerWidth,
            height: window.innerHeight
        });
        document.body.appendChild(app.canvas);

        Renderer.initialize(app);

        const world = new World();
        world.addSystem(new BackgroundSystem());

        try {
            await Loader.loadLevel(levelData, world);
        } catch (error) {
            console.error('Error loading level:', error);
            return;
        }

        world.update(0);
    }
}