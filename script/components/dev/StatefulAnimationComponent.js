import {Component} from '../../ecs/ECS.js';

export class StatefulAnimationComponent extends Component {
    constructor(data) {
        super(data);
        this.animations = data.animations || {};
        this.currentAnimation = 'idle';
    }
}