import {System} from '/script/ecs/ECS.js';
import {SpriteComponent} from '/script/components/object/SpriteComponent.js';
import {PositionComponent} from '/script/components/features/PositionComponent.js';
import * as PIXI from 'pixijs';

export class SpriteSystem extends System {
    constructor(stage) {
        super();
        this.stage = stage;
        this.requiredComponents = [SpriteComponent, PositionComponent];
    }

    update() {
        for (const entity of this.entities) {
            const spriteComponent = entity.getComponent(SpriteComponent);
            const positionComponent = entity.getComponent(PositionComponent);
            if (spriteComponent && spriteComponent.sprite && positionComponent) {
                spriteComponent.sprite.x = positionComponent.x;
                spriteComponent.sprite.y = positionComponent.y;
                spriteComponent.sprite.width = spriteComponent.width;
                spriteComponent.sprite.height = spriteComponent.height;
            }
        }
    }

    onEntityEnterCache(entity) {
        const spriteComponent = entity.getComponent(SpriteComponent);
        const positionComponent = entity.getComponent(PositionComponent);
        if (spriteComponent && !spriteComponent.sprite && positionComponent && positionComponent.x !== undefined && positionComponent.y !== undefined) {
            const sprite = new PIXI.Sprite(spriteComponent.texture);
            sprite.width = spriteComponent.width;
            sprite.height = spriteComponent.height;
            sprite.x = positionComponent.x;
            sprite.y = positionComponent.y;
            spriteComponent.sprite = sprite;
            this.stage.addChild(sprite);
        }
    }

    onEntityLeaveCache(entity) {
        const spriteComponent = entity.getComponent(SpriteComponent);
        if (spriteComponent && spriteComponent.sprite) {
            this.stage.removeChild(spriteComponent.sprite);
            spriteComponent.sprite = null;
        }
    }
}