import {System} from '/script/ecs/ECS.js';
import {BackgroundComponent} from '/script/components/BackgroundComponent.js';
import * as PIXI from 'pixijs';

export class BackgroundSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [BackgroundComponent];
    }

    update() {
        for (const entity of this.entities) {
            const backgroundComponent = entity.getComponent(BackgroundComponent);
            if (backgroundComponent && backgroundComponent.sprite) {
                backgroundComponent.sprite.x = backgroundComponent.x;
                backgroundComponent.sprite.y = backgroundComponent.y;
                backgroundComponent.sprite.width = backgroundComponent.width;
                backgroundComponent.sprite.height = backgroundComponent.height;
            }
        }
    }

    onEntityEnterCache(entity) {
        const backgroundComponent = entity.getComponent(BackgroundComponent);
        if (backgroundComponent && !backgroundComponent.sprite) {
            const texture = backgroundComponent.texture;
            const sprite = new PIXI.Sprite(texture);
            sprite.width = backgroundComponent.width;
            sprite.height = backgroundComponent.height;
            sprite.x = backgroundComponent.x;
            sprite.y = backgroundComponent.y;
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