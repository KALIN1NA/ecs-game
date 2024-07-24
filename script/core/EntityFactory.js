import {Entity} from "../ecs/ECS.js";
import {HeroComponent} from "../components/HeroComponent.js";
import {PositionComponent} from "../components/PositionComponent.js";
import {AnimationComponent} from "../components/AnimationComponent.js";
import {WeaponComponent} from "../components/WeaponComponent.js";
import {ColliderComponent} from "../components/ColliderComponent.js";
import {BackgroundComponent} from "../components/BackgroundComponent";
import {PlatformComponent} from "../components/PlatformComponent";
import {PhysicsComponent} from "../components/PhysicsComponent";
import {BonusComponent} from "../components/BonusComponent.js";

export class EntityFactory {
    constructor(world, resourceManager) {
        this.world = world;
        this.resourceManager = resourceManager;
    }

    hero(data) {
        let entity = new Entity();

        entity.addComponent(new HeroComponent({
            health: data.health,
            maxHealth: data.maxHealth,
            experience: data.experience,
            position: data.position,
            speed: data.speed,
            state: data.state,
            isAlive: data.isAlive,
            experienceMax: data.experienceMax,
            gravity: data.gravity,
            velocity: data.velocity
        }));

        entity.addComponent(new PositionComponent({
            x: data.position.x,
            y: data.position.y
        }));

        entity.addComponent(new AnimationComponent({
            animations: data.animations,
            currentAnimation: data.animations.idle
        }));

        entity.addComponent(new WeaponComponent({
            type: data.weapon.type,
            damage: data.weapon.damage,
            range: data.weapon.range,
            cooldown: data.weapon.cooldown,
            maxAmmo: data.weapon.maxAmmo,
            ammo: data.weapon.ammo
        }));

        entity.addComponent(new ColliderComponent({
            width: data.collider.width,
            height: data.collider.height
        }));

        entity.addComponent(new PhysicsComponent({
            gravity: data.gravity,
            isGrounded: data.isGrounded,
            velocity: data.velocity
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

    bonus({type, position, value}) {
        let entity = new Entity();
        entity.addComponent(new BonusComponent({
            type,
            position,
            value
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