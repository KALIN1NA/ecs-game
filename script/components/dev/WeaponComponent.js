import {Component} from '../../ecs/ECS.js';

export class WeaponComponent extends Component {
    constructor(data) {
        super(data);
        this.type = data.type;
        this.damage = data.damage;
        this.range = data.range;
        this.cooldown = data.cooldown;
        this.maxAmmo = data.maxAmmo;
        this.ammo = data.ammo
    }
}