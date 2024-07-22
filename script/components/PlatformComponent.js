import {Component} from '../ecs/ECS';

export class PlatformComponent extends Component {
    constructor(data) {
        super(data);
        this.type = data.type;
        this.width = data.width;
        this.height = data.height;
        this.x = data.x;
        this.y = data.y;
        this.alpha = data.alpha;
        this.color = data.color;
        this.sprite = null;
    }
}

