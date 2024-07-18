import { World } from './ecs/World.js';
import { BackgroundComponent } from './components/BackgroundComponent.js';
import { BackgroundSystem } from './systems/BackgroundSystem.js';
import { Loader } from './core/Loader.js';
import levelData from './levels/level1.json';

const loader = new Loader();
await loader.loadLevel(levelData);

const world = new World();
world.addSystem(new BackgroundSystem(world));

const backgroundEntity = world.createEntity();
backgroundEntity.addComponent(new BackgroundComponent(levelData.background));