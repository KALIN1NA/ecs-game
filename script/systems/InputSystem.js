import {System} from '../ecs/ECS.js';
import {HeroComponent} from '../components/HeroComponent.js';
import {WeaponComponent} from '../components/WeaponComponent.js';

export class InputSystem extends System {
    constructor() {
        super();
        this.keys = {
            keyLeft: false,
            keyRight: false,
            keyUp: false,
            keyDown: false,
            keyR: false,
            keyDownDouble: false
        };
        this.doubleKeyDown = {
            keyTime: 0,
            keyClickCount: 0
        };
        this.mouse = {
            isDownLeft: false,
            positionX: 0,
            positionY: 0
        };
        this.music = false;
        this.audio = new Audio('/sounds/music.mp3');
        this.audio.volume = 1;
        this.audio.loop = true;
    }

    startMusic() {
        this.audio.load();
        this.audio.play();
        this.music = true;
    }

    onAppMouseDown(event) {
        if (event.button === 0) {
            this.mouse.isDownLeft = true;
        }
    }

    onAppMouseMove(event) {
        if (event.button === 0) {
            this.mouse.positionX = event.clientX;
            this.mouse.positionY = event.clientY;
        }
        if (!this.music) {
            this.startMusic();
        }
    }

    onAppMouseUp(event) {
        if (event.button === 0) {
            this.mouse.isDownLeft = false;
        }
    }

    doubleClickremoveState() {
        this.doubleKeyDown.keyClickCount = 0;
        this.doubleKeyDown.keyTime = 0;
    }

    onKeyDown(event) {
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
            this.keys.keyLeft = true;
            this.keys.keyRight = false;
        }
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
            this.keys.keyRight = true;
            this.keys.keyLeft = false;
        }
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
            this.keys.keyUp = true;
            this.keys.keyDown = false;
        }
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
            this.keys.keyDown = true;
            this.keys.keyUp = false;
        }
        if (event.key === 'r' || event.key === 'к') {
            this.keys.keyR = true;
        }
        if (!this.music) {
            this.startMusic();
        }
    }

    onKeyUp(event) {
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
            this.keys.keyLeft = false;
        }
        if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
            this.keys.keyRight = false;
        }
        if (event.key === 'ArrowDown' || event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
            this.keys.keyDown = false;
        }
        if (new Date() - this.doubleKeyDown.keyTime < 200 || this.doubleKeyDown.keyTime === 0) {
            this.doubleKeyDown.keyTime = new Date();
            this.doubleKeyDown.keyClickCount += 1;
        } else {
            this.doubleClickremoveState();
        }
        if (this.doubleKeyDown.keyClickCount === 2) {
            this.doubleClickremoveState();
        }
        this.keys.keyDownDouble = true;
        if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
            this.keys.keyUp = false;
        }
    }

    update(delta) {
        for (const entity of this.entities) {
            const hero = entity.getComponent(HeroComponent);
            const weapon = entity.getComponent(WeaponComponent);

            if (hero && hero.isAlive) {
                if (this.keys.keyLeft) {
                    hero.position.x -= hero.speed;
                    hero.state = 'walk';
                }
                if (this.keys.keyRight) {
                    hero.position.x += hero.speed;
                    hero.state = 'walk';
                }
                if (this.keys.keyUp && hero.isGrounded) {
                    hero.velocity.y = -hero.jumpPower;
                    hero.isGrounded = false;
                    hero.state = 'jump';
                }
                if (this.mouse.isDownLeft && weapon.cooldownTimer <= 0) {
                    hero.createBullet(this.mouse.positionX, this.mouse.positionY);
                    weapon.cooldownTimer = weapon.cooldown;
                }
                if (this.keys.keyR) {
                    if (weapon.ammo < weapon.maxAmmo) {
                        weapon.ammo = weapon.maxAmmo;
                        hero.state = 'reloading';
                    }
                }
                if (weapon.cooldownTimer > 0) {
                    weapon.cooldownTimer -= delta;
                }
                if (hero.state === 'jumping' && hero.velocity.y >= 0) {
                    hero.state = 'falling';
                }
                if (hero.isGrounded && hero.state !== 'walking') {
                    hero.state = 'idle';
                }
            }
        }
    }
}
