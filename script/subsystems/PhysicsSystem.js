import {System} from '../ecs/ECS.js';
import {PhysicsComponent} from '../components/PhysicsComponent.js';

export class PhysicsSystem extends System {
    constructor() {
        super();
        this.requiredComponents = [PhysicsComponent];
    }

    update(delta) {
        for (const entity of this.entities) {
            const physicsComponent = entity.getComponent(PhysicsComponent);
            if (physicsComponent) {
                if (!physicsComponent.isGrounded) {
                    physicsComponent.velocity.y += physicsComponent.gravitationPower;
                }

                entity.y += physicsComponent.velocity.y * delta;

                // if (entity.y >= groundLevel) {
                //     entity.y = groundLevel;
                //     physicsComponent.isGrounded = true;
                //     physicsComponent.velocity.y = 0;
                // } else {
                //     physicsComponent.isGrounded = false;
                // }
            }
        }
    }
}