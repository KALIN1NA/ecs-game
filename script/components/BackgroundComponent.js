import {Component} from '/script/ecs/ECS.js';

export class BackgroundComponent extends Component {
    constructor(data) {
        super(data);
        this.texture = data.texture;
        this.type = data.type;
        this.width = data.width;
        this.height = data.height;
        this.x = data.x;
        this.y = data.y;
        this.sprite = null;
    }
}

