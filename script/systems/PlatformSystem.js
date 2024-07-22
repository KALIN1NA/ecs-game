import {System} from '../ecs/ECS.js';
import {PlatformComponent} from '../components/PlatformComponent.js';
import * as PIXI from 'pixijs';

export class PlatformSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [PlatformComponent];
    }

    createWall(entity) {
        const wallComponent = entity.getComponent(PlatformComponent);
        if (wallComponent) {
            const wallGraphics = new PIXI.Graphics();
            wallGraphics.beginFill(wallComponent.color, wallComponent.alpha);
            wallGraphics.drawRect(wallComponent.x, wallComponent.y, wallComponent.width, wallComponent.height);
            wallGraphics.endFill();
            wallGraphics.x = wallComponent.x;
            wallGraphics.y = wallComponent.y;
            this.stage.addChild(wallGraphics);
            wallComponent.graphics = wallGraphics;
        }
    }

    onEntityEnterCache(entity) {
        this.createWall(entity);
    }

    onEntityLeaveCache(entity) {
        const wallComponent = entity.getComponent(PlatformComponent);
        if (wallComponent && wallComponent.graphics) {
            this.stage.removeChild(wallComponent.graphics);
            wallComponent.graphics = null;
        }
    }
}
