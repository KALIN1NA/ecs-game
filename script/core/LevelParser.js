export class LevelParser {
    static async loadLevel(levelData, world, factory) {
        try {
            for (let entityDef of levelData.entities) {
                if (entityDef.type === 'hero') {
                    const heroEntity = factory.hero(entityDef);
                    world.addEntity(heroEntity);
                } else if (entityDef.type === 'bonus') {
                    const bonusEntity = factory.createBonus(entityDef);
                    world.addEntity(bonusEntity);
                } else {
                    const entity = factory.createEntity(entityDef.type, entityDef);
                    world.addEntity(entity);
                }
            }
        } catch (error) {
            console.error('Error loading level:', error);
            throw error;
        }
    }
}
