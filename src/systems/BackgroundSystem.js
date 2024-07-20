import {System} from '/src/ecs/ECS.js';
import {BackgroundComponent} from '/src/components/BackgroundComponent.js';
import {StageManager} from '/src/utils/StageManager.js';

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
