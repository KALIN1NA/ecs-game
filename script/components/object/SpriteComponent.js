import {Component} from '/script/ecs/ECS.js';

export class SpriteComponent extends Component {
    constructor(data) {
        super(data);
        this.texture = data.texture;
        this.type = data.type;
        this.width = data.width;
        this.height = data.height;
        this.position = data.position;
        this.sprite = null;
    }
}

