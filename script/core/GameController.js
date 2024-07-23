import {World} from '../ecs/ECS.js';
import {BackgroundSystem} from '../systems/BackgroundSystem.js';
import {PlatformSystem} from '../systems/PlatformSystem.js';
import {Loader} from './Loader.js';
import {LevelParser} from './LevelParser.js';
import level1Data from '/gamedata/levels/level1.json';
import * as PIXI from 'pixijs';
import EntityFactory from "./EntityFactory";
import {resizeCanvas} from "../utils/Resize"

export class GameController {
    static async start() {
        const app = new PIXI.Application({
            background: '#000000',
            width: window.innerWidth,
            height: window.innerHeight
        });
        document.body.appendChild(app.view);

        const world = new World();
        world.addSystem(new BackgroundSystem(app.stage));
        world.addSystem(new PlatformSystem(app.stage));
        //world.addSystem(new SpriteSystem(app.stage));

        window.addEventListener('resize', () => resizeCanvas(app, world))
        resizeCanvas(app, world);
        await Loader.loadAssets();

        let factory = new EntityFactory(world, PIXI.Assets)
        try {
            await LevelParser.loadLevel(level1Data, world, factory);
        } catch (error) {
            console.error('Error loading level:', error);
            return;
        }

        app.ticker.add((delta) => {
            world.update(delta);
        });
    }
}