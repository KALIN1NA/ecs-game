import { Component } from '../ecs/ECS.js';

export class BackgroundComponent extends Component {
    constructor(levelBackground) {
        super();
        this.texture = levelBackground.texture;
        this.width = levelBackground.width;
        this.height = levelBackground.height;
        this.sprite = this.texture.createSprite();
        this.sprite.width = this.width;
        this.sprite.height = this.height;
    }
}