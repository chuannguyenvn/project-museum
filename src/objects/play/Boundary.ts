import GameObject = Phaser.GameObjects.GameObject
import Rectangle = Phaser.GameObjects.Rectangle
import Vector2 = Phaser.Math.Vector2
import Color = Phaser.Display.Color
import PlayScene from "../../scenes/PlayScene"
import GameObjectType from "../../configs/GameObjectType"
import Constants from "../../configs/Constants"

class Boundary extends GameObject
{
    private walls: Rectangle[] = []

    constructor(scene: PlayScene, normalizedSize: Vector2, colorString: string) {
        super(scene, GameObjectType.BOUNDARY)

        const color = Color.HexStringToColor(colorString).color
        this.walls.push(new Rectangle(scene, -5000, 0, 10000, 100000, color))
        this.walls.push(new Rectangle(scene, 0, -5000, 100000, 10000, color))
        this.walls.push(new Rectangle(scene, 0, normalizedSize.y * Constants.CELL_SIZE + 5000, 100000, 10000, color))
        this.walls.push(new Rectangle(scene, normalizedSize.x * Constants.CELL_SIZE + 5000, 0, 10000, 100000, color))

        for (let i = 0; i < this.walls.length; i++)
        {
            this.walls[i].depth = 5000
            scene.add.existing(this.walls[i])
            scene.matter.add.rectangle(this.walls[i].x, this.walls[i].y, this.walls[i].width, this.walls[i].height)
        }
    }
}

export default Boundary