import imagesMap from '/gamedata/images.json';
import * as PIXI from 'pixijs';

export class Loader {
    static prefixAssets(assetMap, pathPrefix) {
        const prefixedAssetMap = [];

        for (const key in assetMap) {
            prefixedAssetMap.push({alias: [key], src: pathPrefix + assetMap[key]})
        }
        return prefixedAssetMap
    }

    static async loadAssets() {
        try {
            const assets = Loader.prefixAssets(imagesMap, "assets/images/");
            // console.log("Loading assets:", assets);
            await PIXI.Assets.load(assets);
            // console.log(texture)
            // console.log('Available assets:', PIXI.Assets.cache);
        } catch (error) {
            console.error(`Failed to load textures:`, error);
        }
    }
}
