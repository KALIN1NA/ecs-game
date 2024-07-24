import {Component} from '../../ecs/ECS.js';

export class PhysicsComponent extends Component {
    constructor(data) {
        super(data);
        this.velocity;
        this.gravity = data.gravity;
        this.isGrounded = data.isGrounded;
    }
}