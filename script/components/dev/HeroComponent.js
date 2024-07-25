import {Component} from '/script/ecs/ECS.js';

export class HeroComponent extends Component {
    constructor(data) {
        super(data);
        this.health = data.health;
        this.maxHealth = data.maxHealth;
        this.experience = data.experience;
        this.speed = data.speed;
        this.animations = data.animations;
        this.weapon = data.weapon;
        this.state = data.state;
        this.isAlive = data.isAlive;
        this.experienceMax = data.experienceMax;
    }
}