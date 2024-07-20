import { System } from '/ecs/ECS.js';
import { BackgroundComponent } from '/components/BackgroundComponent.js';
import { Renderer } from '/utils/Renderer.js';

export class BackgroundSystem extends System {
    constructor() {
        super();
        this.requiredComponents = [BackgroundComponent];
    }

    update(deltaTime) {
        //Renderer.app.stage.removeChildren();
        for (const entity of this.entities) {
            const backgroundComponent = entity.getComponent(BackgroundComponent);
            if (backgroundComponent) {
                backgroundComponent.sprite.visible = true;
            }
        }
    }
}
