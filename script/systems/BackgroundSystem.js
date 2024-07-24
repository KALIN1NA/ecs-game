import {System} from '/script/ecs/ECS.js';
import {BackgroundComponent} from '/script/components/object/BackgroundComponent.js';
import {PositionComponent} from '/script/components/features/PositionComponent.js';
import * as PIXI from 'pixijs';

export class BackgroundSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [BackgroundComponent, PositionComponent];
    }

    update() {
        for (const entity of this.entities) {
            const backgroundComponent = entity.getComponent(BackgroundComponent);
            const positionComponent = entity.getComponent(PositionComponent);
            if (backgroundComponent && backgroundComponent.sprite && positionComponent) {
                backgroundComponent.sprite.x = positionComponent.x;
                backgroundComponent.sprite.y = positionComponent.y;
                backgroundComponent.sprite.width = backgroundComponent.width;
                backgroundComponent.sprite.height = backgroundComponent.height;
            }
        }
    }

    onEntityEnterCache(entity) {
        const backgroundComponent = entity.getComponent(BackgroundComponent);
        const positionComponent = entity.getComponent(PositionComponent);
        if (backgroundComponent && !backgroundComponent.sprite) {
            const sprite = new PIXI.Sprite(backgroundComponent.texture);
            sprite.width = backgroundComponent.width;
            sprite.height = backgroundComponent.height;
            sprite.x = positionComponent.x;
            sprite.y = positionComponent.y;
            backgroundComponent.sprite = sprite;
            this.stage.addChild(sprite);
        }
    }

    onEntityLeaveCache(entity) {
        const backgroundComponent = entity.getComponent(BackgroundComponent);
        if (backgroundComponent && backgroundComponent.sprite) {
            this.stage.removeChild(backgroundComponent.sprite);
            backgroundComponent.sprite = null;
        }
    }
}