import { System } from '../ecs/ECS.js';
import { BackgroundSystem } from './BackgroundSystem.js';

export class RenderSystem extends System
{
    constructor(world)
    {
        super(world, []);
    }

    update(delta)
    {
        const backgroundSystem = this.world.getSystem(BackgroundSystem);
        backgroundSystem.update(delta);

        this.entities.forEach((entity) => {
            // Render other entities
        });
    }
}