export class LevelParser {
    static async loadLevel(levelData, world, factory) {
        try {
            for (let entityDef of levelData.entities) {
                let entity = factory.createEntity(entityDef.type, entityDef);
                world.addEntity(entity);
            }
        } catch (error) {
            console.error('Error loading level:', error);
            throw error;
        }
    }
}
