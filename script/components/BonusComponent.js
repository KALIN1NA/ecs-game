import {Component} from '../ecs/ECS.js';

export class BonusComponent extends Component {
    constructor(data) {
        super(data);
        this.type = data.type;
        this.position = data.position;
        this.value = data.value;
    }
}