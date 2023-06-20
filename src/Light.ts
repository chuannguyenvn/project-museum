import {Scene} from "phaser"

class Light extends Phaser.GameObjects.Sprite
{
    constructor(scene: Scene) {
        super(scene, 0, 0, 'light')
        scene.add.existing(this)
    }

    update(time: number, delta: number): void {
        this.depth = 100
    }

    public moveToCursor(pointer: Phaser.Input.Pointer): void {
        console.log("a")
        this.setX(pointer.x)
        this.setY(pointer.y)
        this.scale = 0.1
    }
}

export default Light