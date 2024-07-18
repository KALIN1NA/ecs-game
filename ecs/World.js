class World
{
    constructor()
    {
        this.entities = new Map();
        this.systems = [];
        this.nextEntityId = 1;
    }

    createEntity()
    {
        const entity = new Entity(this.nextEntityId++);
        this.entities.set(entity.id, entity);
        for (const system of this.systems)
        {
            system.addEntity(entity);
        }
        return entity;
    }

    removeEntity(entityId)
    {
        const entity = this.entities.get(entityId);
        if (entity)
        {
            for (const system of this.systems)
            {
                system.removeEntity(entity);
            }
            this.entities.delete(entityId);
        }
    }

    addSystem(system)
    {
        system.init(this);
        this.systems.push(system);
        // Add existing entities to the new system
        for (const entity of this.entities.values())
        {
            system.addEntity(entity);
        }
    }

    update(deltaTime)
    {
        for (const system of this.systems)
        {
            system.update(deltaTime);
        }
    }

    updateEntityComponents(entity)
    {
        for (const system of this.systems)
        {
            if (system.matchEntity(entity))
            {
                system.addEntity(entity);
            } else {
                system.removeEntity(entity);
            }
        }
    }
}