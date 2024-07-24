import {Component} from '../../ecs/ECS.js';

export class AnimationComponent extends Component {
    constructor(data) {
        super(data);
        this.animations = data.animations || {};
        this.currentAnimation = data.currentAnimation || 'idle';
    }
}