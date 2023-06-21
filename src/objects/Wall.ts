import GameObject = Phaser.GameObjects.GameObject
import Rectangle = Phaser.GameObjects.Rectangle
import Vector2 = Phaser.Math.Vector2
import PlayScene from "../scenes/PlayScene"
import GameObjectType from "../configs/GameObjectType"
import Constants from "../configs/constants"

class Wall extends GameObject
{
    private normalizedPosition: Vector2
    private wallRectangle: Rectangle

    constructor(scene: PlayScene, normalizedPosition: Vector2) {
        super(scene, GameObjectType.WALL)
        scene.add.existing(this)

        this.normalizedPosition = normalizedPosition
        this.wallRectangle = scene.add.rectangle(
            normalizedPosition.x * Constants.CELL_SIZE,
            normalizedPosition.y * Constants.CELL_SIZE,
            Constants.CELL_SIZE,
            Constants.CELL_SIZE,
            Constants.WALL_COLOR)
    }
}

export default Wall