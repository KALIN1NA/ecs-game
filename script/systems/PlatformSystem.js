import {System} from '../ecs/ECS.js';
import {PlatformComponent} from '../components/PlatformComponent.js';
import * as PIXI from 'pixijs';

export class PlatformSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [PlatformComponent];
    }

    createPlatform(entity) {
        const platformComponent = entity.getComponent(PlatformComponent);
        if (platformComponent) {
            const platformGraphics = new PIXI.Graphics();
            platformGraphics.beginFill(platformComponent.color, platformComponent.alpha);
            platformGraphics.drawRect(0, 0, platformComponent.width, platformComponent.height);
            platformGraphics.endFill();
            platformGraphics.x = platformComponent.x;
            platformGraphics.y = platformComponent.y;
            this.stage.addChild(platformGraphics);
            platformComponent.graphics = platformGraphics;
        }
    }

    onEntityEnterCache(entity) {
        this.createPlatform(entity);
    }

    onEntityLeaveCache(entity) {
        const platformComponent = entity.getComponent(PlatformComponent);
        if (platformComponent && platformComponent.graphics) {
            this.stage.removeChild(platformComponent.graphics);
            platformComponent.graphics = null;
        }
    }

    updatePlatforms() {
        for (const entity of this.entities) {
            const platformComponent = entity.getComponent(PlatformComponent);
            if (platformComponent && platformComponent.graphics) {
                platformComponent.graphics.x = platformComponent.x;
                platformComponent.graphics.y = platformComponent.y;
                platformComponent.graphics.width = platformComponent.width;
                platformComponent.graphics.height = platformComponent.height;
            }
        }
    }
}