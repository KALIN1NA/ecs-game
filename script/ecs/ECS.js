export class Component {
    constructor(data = {}) {
        Object.assign(this, data);
    }
}

export class Entity {
    constructor() {
        this.components = new Map();
        this.componentTypes = new Set();
    }

    addComponent(component) {
        this.components.set(component.constructor, component);
        this.componentTypes.add(component.constructor);
    }

    removeComponent(ComponentClass) {
        this.components.delete(ComponentClass);
        this.componentTypes.delete(ComponentClass);
    }

    getComponent(ComponentClass) {
        return this.components.get(ComponentClass);
    }

    hasComponent(ComponentClass) {
        return this.componentTypes.has(ComponentClass);
    }

    setID(id) {
        this.id = id;
    }
}

export class System {
    constructor() {
        this.world = null;
        this.requiredComponents = [];
        this.entities = [];
    }

    init(world) {
        this.world = world;
    }

    //предназначен для переопределения в производных системах
    update() {
    }

    //проверяет, есть ли у сущности все необходимые компоненты, указанные в requiredComponents
    matchEntity(entity) {
        return this.requiredComponents.every(ComponentClass => entity.hasComponent(ComponentClass));
    }

    tryAddEntity(entity) {
        if (this.matchEntity(entity) && !this.entities.includes(entity)) {
            this.entities.push(entity);
            this.onEntityEnterCache(entity);
        }
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.onEntityLeaveCache(entity);
            this.entities.splice(index, 1);
        }
    }

    onEntityEnterCache() {
    }

    onEntityLeaveCache() {
    }
}

export class World {
    constructor() {
        this.entities = new Map();
        this.systems = [];
        this.nextEntityId = 1;
    }

    addEntity(entity) {
        entity.setID(this.nextEntityId++);
        this.entities.set(entity.id, entity);
        for (const system of this.systems) {
            system.tryAddEntity(entity);
        }
        return entity;
    }

    removeEntity(entityId) {
        const entity = this.entities.get(entityId);
        if (entity) {
            for (const system of this.systems) {
                system.removeEntity(entity);
            }
            this.entities.delete(entityId);
        }
    }

    addSystem(system) {
        this.systems.push(system);
        system.init(this);
        for (const entity of this.entities.values()) {
            system.tryAddEntity(entity);
        }
    }

    update(deltaTime) {
        for (const system of this.systems) {
            system.update(deltaTime);
        }
    }

    updateEntityComponents(entity) {
        for (const system of this.systems) {
            if (system.matchEntity(entity)) {
                system.tryAddEntity(entity);
            } else {
                system.removeEntity(entity);
            }
        }
    }
}