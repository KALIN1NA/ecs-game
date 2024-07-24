import {Component} from '../ecs/ECS.js';

export class ColliderComponent extends Component {
    constructor(data) {
        super(data);
        this.width = data.width;
        this.height = data.height;
    }
}