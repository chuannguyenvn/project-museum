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
        this.add.text(50, 50, "AAAAA")

        const overlay = this.add.graphics()

        overlay.fillStyle(0x000000, 0.8).fillRect(0, 0, 800, 600)

        const maskGraphics = this.make.graphics()

        maskGraphics.fillStyle(0xffffff)
        maskGraphics.fillRect(100, 100, 256, 256)

        const mask = new Phaser.Display.Masks.BitmapMask(this, maskGraphics)

        mask.invertAlpha = true

        overlay.setMask(mask)

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
