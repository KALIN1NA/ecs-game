export class LevelParser {
    static async loadLevel(levelData, world, factory) {

        for (let entityDef of levelData.entities) {
            let entity = factory.createEntity(entityDef.type, entityDef)
            world.addEntity(entity)
        }
    }
}