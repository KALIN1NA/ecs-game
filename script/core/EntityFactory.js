import {Entity} from "../ecs/ECS.js";
import {PositionComponent} from "../components/features/PositionComponent.js";
import {SpriteComponent} from "../components/object/SpriteComponent";
import {PlatformComponent} from "../components/object/PlatformComponent";

//import {SpriteComponent} from "../components/object/SpriteComponent";

export class EntityFactory {
    constructor(world, resourceManager) {
        this.world = world;
        this.resourceManager = resourceManager;
    }

    background(data) {
        const texture = this.resourceManager.get(data.texture);
        let entity = new Entity();
        entity.addComponent(new SpriteComponent({
            texture: texture,
            width: data.width,
            height: data.height,
        }));
        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
        }));
        return entity;
    }

    sprite(data) {
        const texture = this.resourceManager.get(data.texture);
        let entity = new Entity();
        entity.addComponent(new SpriteComponent({
            texture: texture,
            width: data.width,
            height: data.height
        }));
        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
        }));
        return entity;
    }

    wall(data) {
        let entity = new Entity();
        entity.addComponent(new PlatformComponent({
            width: data.width,
            height: data.height,
            alpha: data.alpha,
            color: data.color
        }));
        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
        }));
        return entity;
    }

    platform(data) {
        let entity = new Entity();
        entity.addComponent(new PlatformComponent({
            width: data.width,
            height: data.height,
            alpha: data.alpha,
            color: data.color
        }));
        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
        }));
        return entity;
    }

    trapdoor(data) {
        let entity = new Entity();
        entity.addComponent(new PlatformComponent({
            width: data.width,
            height: data.height,
            alpha: data.alpha,
            color: data.color
        }));
        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
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