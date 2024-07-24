import {Component} from '../../ecs/ECS.js';

export class FlyingPatrollingComponent extends Component {
    constructor(data) {
        super(data);
        this.speed = data.speed || 3;
        this.flyHeight = data.flyHeight || 50;
    }
}