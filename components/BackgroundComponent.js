import { Component } from '/ecs/ECS.js';

export class BackgroundComponent extends Component {
    constructor(data) {
        super(data);
        this.texture = PIXI.Texture.from(data.texture);
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.width = data.width;
        this.sprite.height = data.height;
        this.sprite.x = data.x;
        this.sprite.y = data.y;
    }

    view(scene) {
        scene.addChild(this.sprite);
    }

    deleteView(scene) {
        scene.removeChild(this.sprite);
    }
}
