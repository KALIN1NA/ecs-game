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
        if (entity.hasComponent('sprite')) {
            const spriteComponent = entity.getComponent('sprite');
            if (spriteComponent.sprite) {
                spriteComponent.sprite.x = spriteComponent.x;
                spriteComponent.sprite.y = spriteComponent.y;
            }
        }
    }
}