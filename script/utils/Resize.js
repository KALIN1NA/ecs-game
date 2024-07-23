import {PlatformSystem} from "../systems/PlatformSystem";

export function resizeCanvas(app, world) {
    const aspectRatio = 16 / 8;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width / height < aspectRatio) {
        app.renderer.resize(width, width / aspectRatio);
    } else {
        app.renderer.resize(height * aspectRatio, height);
    }

    const entities = world.getEntities();
    for (const entity of entities) {
        if (entity.x !== undefined && entity.y !== undefined) {
            entity.x *= app.renderer.resolution;
            entity.y *= app.renderer.resolution;

            if (entity.hasComponent('sprite')) {
                const spriteComponent = entity.getComponent('sprite');
                if (spriteComponent.sprite) {
                    spriteComponent.sprite.x = entity.x;
                    spriteComponent.sprite.y = entity.y;
                }
            }
        }
    }

    const platformSystem = world.getSystem(PlatformSystem);
    if (platformSystem) {
        platformSystem.updatePlatforms();
    }
}