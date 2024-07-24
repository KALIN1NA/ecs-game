import {Component} from '../../ecs/ECS.js';

export class WalkingPatrollingComponent extends Component {
    constructor(data) {
        super(data);
        this.speed = data.speed || 2;
        this.patrolPoints = data.patrolPoints || [];
        this.currentPointIndex = 0;
    }
}