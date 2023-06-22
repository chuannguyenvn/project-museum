import Color = Phaser.Display.Color
import Rectangle = Phaser.GameObjects.Rectangle
import Vector2 = Phaser.Math.Vector2
import PlayScene from "../../scenes/PlayScene"
import Constants from "../../configs/Constants"

class Painting extends Rectangle
{
    public readonly paintingRaycastPoints: Vector2[] = []

    constructor(scene: PlayScene, normalizedPosition: Vector2, size: Vector2, color: Color) {
        super(
            scene,
            normalizedPosition.x * Constants.CELL_SIZE,
            normalizedPosition.y * Constants.CELL_SIZE,
            size.x === 0 ? Constants.PAINTING_THICKNESS : size.x * Constants.CELL_SIZE,
            size.y === 0 ? Constants.PAINTING_THICKNESS : size.y * Constants.CELL_SIZE,
            color.color)
        this.scene.add.existing(this)

        if (size.x === 0)
        {
            const nomalizedPosition = normalizedPosition.subtract(new Vector2(0, size.y / 2))
            for (let y = 0; y <= size.y; y++)
            {
                this.paintingRaycastPoints.push(nomalizedPosition.clone().add(new Vector2(0, y)).scale(Constants.CELL_SIZE))
            }
        }
        else
        {
            const nomalizedPosition = normalizedPosition.subtract(new Vector2(size.x / 2, 0))
            for (let x = 0; x <= size.x; x++)
            {
                this.paintingRaycastPoints.push(nomalizedPosition.clone().add(new Vector2(x, 0)).scale(Constants.CELL_SIZE))
            }
        }
    }

    public setLightStatus(isFullyLighted: boolean): void {
        if (isFullyLighted) this.fillColor = new Color(255, 0, 0).color
        else this.fillColor = new Color(0, 0, 0).color
    }
}

export default Painting