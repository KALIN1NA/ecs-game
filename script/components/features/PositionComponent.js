import {Component} from '../../ecs/ECS.js';

export class PositionComponent extends Component {
    constructor(data) {
        super(data);
        this.x = data.x;
        this.y = data.y;
    }
}