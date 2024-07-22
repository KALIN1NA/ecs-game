import {World} from '/script/ecs/ECS.js';
import {BackgroundSystem} from '/script/systems/BackgroundSystem.js';
import {Loader} from '/script/core/Loader.js';
import {LevelParser} from '/script/core/LevelParser.js';
import level1Data from '/gamedata/levels/level1.json';
import * as PIXI from 'pixijs';
import EntityFactory from "./EntityFactory";

export class GameController {
    static async start() {
        const app = new PIXI.Application({
            background: '#000000',
            width: window.innerWidth,
            height: window.innerHeight
        });
        document.body.appendChild(app.view);
        await Loader.loadAssets();

        const world = new World();
        world.addSystem(new BackgroundSystem(app.stage));
        //world.addSystem(new SpriteSystem(app.stage));
        //world.addSystem(new SpriteSystem(app.stage));

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