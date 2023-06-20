import * as Phaser from "phaser"
import Light from "./Light"
import Grid from "./Grid"
import Vector2 = Phaser.Math.Vector2

class GameScene extends Phaser.Scene
{
    private readonly CELL_SIZE: number = 100
    private cat: Phaser.GameObjects.Sprite
    private light: Light
    public grid: Grid

    preload(): void {
        this.load.image('cat', 'assets/cat.jpg')
        this.load.image('light', 'assets/light.png')
    }

    create(): void {
        // this.cat = this.add.sprite(0, 0, 'cat')
        // this.cat.setOrigin(0, 0)
        //
        // this.light = new Light(this)
        // this.input.on('pointermove', this.light.moveToCursor, this.light)

        const blocks = []
        for (let i = 0; i < 500; i++)
        {
            blocks.push(new Vector2(Math.round(Math.random() * 100), Math.round(Math.random() * 100)))
        }

        this.grid = new Grid(this, new Vector2(1000, 1000), blocks, [])
        this.light = new Light(this)
    }

    update(time: number, delta: number) {
        super.update(time, delta)
        this.light.update(new Vector2(this.input.mousePointer.x, this.input.mousePointer.y))
    }
}

export default GameScene

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    fps: {target: 60},
    backgroundColor: "eeeeee",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 800},
            enableBody: true,

        }
    },
    scene: [GameScene]
}

const game = new Phaser.Game(config)
