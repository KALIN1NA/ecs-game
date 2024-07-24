import {System} from '../ecs/ECS.js';
import {PlatformComponent} from '../components/object/PlatformComponent.js';
import {PositionComponent} from '../components/features/PositionComponent.js';
import * as PIXI from 'pixijs';

export class PlatformSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [PlatformComponent, PositionComponent];
    }

    createPlatform(entity) {
        const platformComponent = entity.getComponent(PlatformComponent);
        const positionComponent = entity.getComponent(PositionComponent);
        if (platformComponent && positionComponent) {
            const platformGraphics = new PIXI.Graphics();
            platformGraphics.beginFill(platformComponent.color, platformComponent.alpha);
            platformGraphics.drawRect(0, 0, platformComponent.width, platformComponent.height);
            platformGraphics.endFill();
            platformGraphics.x = positionComponent.x;
            platformGraphics.y = positionComponent.y;
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
            const positionComponent = entity.getComponent(PositionComponent);
            if (platformComponent && platformComponent.graphics && positionComponent) {
                platformComponent.graphics.x = positionComponent.x;
                platformComponent.graphics.y = positionComponent.y;
                platformComponent.graphics.width = platformComponent.width;
                platformComponent.graphics.height = platformComponent.height;
            }
        }
    }
}