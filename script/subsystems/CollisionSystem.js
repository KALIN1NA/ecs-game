import {System} from '../ecs/ECS.js';
import {PhysicsComponent} from '../components/PhysicsComponent.js';

export class CollisionSystem extends System {
    constructor() {
        super();
        this.requiredComponents = [PhysicsComponent];
    }

    update() {
        for (const entity of this.entities) {
            const physicsComponent = entity.getComponent(PhysicsComponent);
            if (physicsComponent) {
                this.updateCollisions(physicsComponent, this.entities);
            }
        }
    }

    updateCollisions(physicsComponent, platforms) {
        for (let entity of platforms) {
            if (entity.type === 'wall') {
                this.handleWallCollision(physicsComponent, entity);
            } else if (entity.type === 'platform') {
                this.handlePlatformCollision(physicsComponent, entity);
            } else if (entity.type === 'trapdoor') {
                this.handleTrapdoorCollision(physicsComponent, entity);
            }
        }
    }

    handleWallCollision(physicsComponent, wall) {
        if (this.checkCollision(physicsComponent, wall)) {
            if (physicsComponent.velocity.x > 0) {
                physicsComponent.collideRight = wall.collideLeft;
                physicsComponent.sprite.x = wall.collideLeft - physicsComponent.sprite.width / 2;
            } else if (physicsComponent.velocity.x < 0) {
                physicsComponent.collideLeft = wall.collideRight;
                physicsComponent.sprite.x = wall.collideRight + physicsComponent.sprite.width / 2;
            }
        }
    }

    handlePlatformCollision(physicsComponent, platform) {
        if (this.checkCollision(physicsComponent, platform)) {
            if (physicsComponent.collideBottom <= platform.collideBottom &&
                physicsComponent.collideBottom >= platform.collideTop) {
                physicsComponent.velocity.y = 0;
                physicsComponent.isGrounded = true;
                physicsComponent.sprite.y = platform.collideTop - physicsComponent.sprite.height / 2;
            } else if (physicsComponent.collideTop >= platform.collideTop &&
                physicsComponent.collideTop <= platform.collideBottom) {
                physicsComponent.velocity.y = 0;
                physicsComponent.sprite.y = platform.collideBottom + physicsComponent.sprite.height / 2;
            }
        }
    }

    handleTrapdoorCollision(physicsComponent, trapdoor) {
        if (this.checkCollision(physicsComponent, trapdoor)) {
            if (physicsComponent.sprite.vy > 0 && physicsComponent.doubleJump) {
                physicsComponent.sprite.y = trapdoor.collideBottom + physicsComponent.sprite.height / 2;
            } else if (physicsComponent.sprite.vy < 0) {
                physicsComponent.sprite.y = trapdoor.collideTop - physicsComponent.sprite.height / 2;
            }
        }
    }

    checkCollision(component1, component2) {
        return (
            component1.collideRight > component2.collideLeft &&
            component1.collideLeft < component2.collideRight &&
            component1.collideBottom > component2.collideTop &&
            component1.collideTop < component2.collideBottom
        );
    }
}
