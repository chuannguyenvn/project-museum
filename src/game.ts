import * as Phaser from "phaser"
import Light from "./Light"
import Grid from "./Grid"
import Vector2 = Phaser.Math.Vector2

class Game extends Phaser.Scene
{
    private readonly CELL_SIZE: number = 100
    private cat: Phaser.GameObjects.Sprite
    private light: Light
    private grid: Grid
    
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

        this.grid = new Grid(this, new Vector2(10, 10), [new Vector2(1, 1), new Vector2(1, 5), new Vector2(3, 7), new Vector2(9, 2)], [])
    }
    
    update(time: number, delta: number) {
        super.update(time, delta)
        this.grid.update(new Vector2(this.input.mousePointer.x, this.input.mousePointer.y))
    }
}

const config = {
    type: Phaser.AUTO,
    width: 600,
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
