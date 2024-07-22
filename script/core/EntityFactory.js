import {BackgroundComponent} from "../components/BackgroundComponent";
import {Entity} from "../ecs/ECS";

export class EntityFactory {
    constructor(world, resourceManager) {
        this.world = world;
        this.resourceManager = resourceManager;
    }

    background({texture, width, height, x, y}) {
        texture = this.resourceManager.get(texture);
        let entity = new Entity();

        entity.addComponent(new BackgroundComponent({
            texture: texture,
            width,
            height,
            x,
            y
        }));

        return entity;
    }

    createEntity(type, opt) {
        const factoryMethod = this[type];
        if (factoryMethod) {
            return factoryMethod.call(this, opt);
        } else {
            throw new Error(`Entity type "${type}" is not supported.`);
        }
    }
}

export default EntityFactory;