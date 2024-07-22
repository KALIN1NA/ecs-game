import {System} from '../ecs/ECS.js';
import {WallComponent} from '../components/WallComponent.js';
import * as PIXI from 'pixijs';

export class WallSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [WallComponent];
    }

    createWall(entity) {
        const wallComponent = entity.getComponent(WallComponent);
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
        const wallComponent = entity.getComponent(WallComponent);
        if (wallComponent && wallComponent.graphics) {
            this.stage.removeChild(wallComponent.graphics);
            wallComponent.graphics = null;
        }
    }
}
