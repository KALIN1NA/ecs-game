import {Component} from '../../ecs/ECS';

export class PlatformComponent extends Component {
    constructor(data) {
        super(data);
        this.type = data.type;
        this.width = data.width;
        this.height = data.height;
        this.position = data.position;
        this.alpha = data.alpha || 1;
        this.color = data.color;
    }
}

