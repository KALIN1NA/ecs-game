import {Component} from '../ecs/ECS.js';

export class PhysicsComponent extends Component {
    constructor(data) {
        super(data);
        this.velocity = data.velocity || {x: 0, y: 0};
        this.gravity = data.gravity || 0.5;
        this.gravitationPower = data.gravitationPower || 0.5;
        this.isGrounded = data.isGrounded || false;
    }
}