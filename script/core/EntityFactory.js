import {Entity} from "../ecs/ECS.js";
import {HeroComponent} from "../components/HeroComponent.js";
import {PositionComponent} from "../components/PositionComponent.js";
import {AnimationComponent} from "../components/AnimationComponent.js";
import {ColliderComponent} from "../components/ColliderComponent.js";
import {BackgroundComponent} from "../components/BackgroundComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {BonusComponent} from "../components/BonusComponent.js";

export class EntityFactory {
    constructor(world, resourceManager) {
        this.world = world;
        this.resourceManager = resourceManager;
    }

    hero(data) {
        let entity = new Entity();

        entity.addComponent(new HeroComponent({
            position: data.position,
            speed: data.speed,
            state: data.state,
        }));

        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
        }));

        entity.addComponent(new AnimationComponent({
            animations: data.animations,
            currentAnimation: data.animations.idle
        }));

        entity.addComponent(new ColliderComponent({
            width: data.collider.width,
            height: data.collider.height
        }));

        return entity;
    }

    createBonus({type, position, value}) {
        let entity = new Entity();
        entity.addComponent(new BonusComponent({
            type,
            position,
            value
        }));
        return entity;
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

    wall({width, height, x, y, alpha, color}) {
        let entity = new Entity();
        entity.addComponent(new PlatformComponent({
            width,
            height,
            x,
            y,
            alpha,
            color
        }));
        return entity;
    }

    platform({width, height, x, y, alpha, color}) {
        let entity = new Entity();
        entity.addComponent(new PlatformComponent({
            width,
            height,
            x,
            y,
            alpha,
            color
        }));
        return entity;
    }

    trapdoor({width, height, x, y, alpha, color}) {
        let entity = new Entity();
        entity.addComponent(new PlatformComponent({
            width,
            height,
            x,
            y,
            alpha,
            color
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