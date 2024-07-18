import { System } from '../ecs/ECS.js';
import { BackgroundComponent } from '../components/BackgroundComponent.js';

export class BackgroundSystem extends System {
    constructor(world) {
        super(world, [BackgroundComponent]);
    }

    update(delta) {
        this.entities.forEach((entity) => {
            const backgroundComponent = entity.getComponent(BackgroundComponent);
            this.world.app.stage.addChild(backgroundComponent.sprite);
        });
    }
}