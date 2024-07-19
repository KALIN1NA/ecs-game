import { System } from '/ecs/ECS.js';
import { BackgroundComponent } from '/components/BackgroundComponent.js';
import { Renderer } from '/utils/Renderer.js';

export class BackgroundSystem extends System {
    constructor() {
        super();
        this.requiredComponents = [BackgroundComponent];
    }

    update(deltaTime) {
        Renderer.app.stage.removeChildren();

        for (const entity of this.entities) {
            const backgroundComponent = entity.getComponent(BackgroundComponent);
            if (backgroundComponent) {
                const background = new PIXI.Sprite(backgroundComponent.texture);
                background.width = backgroundComponent.width;
                background.height = backgroundComponent.height;
                background.x = backgroundComponent.x;
                background.y = backgroundComponent.y;
                Renderer.addChild(background);
            }
        }
    }
}
