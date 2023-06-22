import GameObject = Phaser.GameObjects.GameObject
import Rectangle = Phaser.GameObjects.Rectangle
import Vector2 = Phaser.Math.Vector2
import PlayScene from "../../scenes/PlayScene"
import GameObjectType from "../../configs/GameObjectType"
import Constants from "../../configs/Constants"

class Boundary extends GameObject
{
    private walls: Rectangle[] = []

    constructor(scene: PlayScene, normalizedSize: Vector2) {
        super(scene, GameObjectType.BOUNDARY)

        this.walls.push(new Rectangle(scene, -5000, 0, 10000, 100000, 0x222222))
        this.walls.push(new Rectangle(scene, 0, -5000, 100000, 10000, 0x222222))
        this.walls.push(new Rectangle(scene, 0, normalizedSize.x * Constants.CELL_SIZE + 5000, 100000, 10000, 0x222222))
        this.walls.push(new Rectangle(scene, normalizedSize.x * Constants.CELL_SIZE + 5000, 0, 10000, 100000, 0x222222))

        for (let i = 0; i < this.walls.length; i++)
        {
            this.walls[i].depth = 1000
            scene.add.existing(this.walls[i])
        }
    }
}

export default Boundary