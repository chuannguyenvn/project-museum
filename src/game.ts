import * as Phaser from "phaser"
import Light from "./Light"

class Game extends Phaser.Scene
{
    private readonly CELL_SIZE: number = 100
    private cat: Phaser.GameObjects.Sprite
    private light: Light

    preload(): void {
        this.load.image('cat', 'assets/cat.jpg')
        this.load.image('light', 'assets/light.png')
    }

    create(): void {
        this.cat = this.add.sprite(0, 0, 'cat')
        this.cat.setOrigin(0, 0)

        this.light = new Light(this)
        this.input.on('pointermove', this.light.moveToCursor, this.light)
    }
    
    update(time: number, delta: number) {
        this.light.update(time, delta)
    }
}

const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    fps: {target: 60},
    backgroundColor: "eeeeee",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            enableBody: true,

        }
    },
    scene: [Game]
}

const game = new Phaser.Game(config)
