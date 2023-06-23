import Color = Phaser.Display.Color
import Rectangle = Phaser.GameObjects.Rectangle
import Vector2 = Phaser.Math.Vector2
import PlayScene from "../../scenes/PlayScene"
import Constants from "../../configs/Constants"

class Painting extends Rectangle
{
    public readonly paintingRaycastPoints: Vector2[] = []
    private playScene: PlayScene

    private isFullyLit: boolean = true

    constructor(scene: PlayScene, normalizedPosition: Vector2, size: Vector2, color: Color) {
        super(
            scene,
            normalizedPosition.x * Constants.CELL_SIZE,
            normalizedPosition.y * Constants.CELL_SIZE,
            size.x === 0 ? Constants.PAINTING_THICKNESS : size.x * Constants.CELL_SIZE,
            size.y === 0 ? Constants.PAINTING_THICKNESS : size.y * Constants.CELL_SIZE,
            color.color)
        this.scene.add.existing(this)

        this.playScene = scene

        if (size.x === 0)
        {
            const offsetNormalizedPosition = normalizedPosition.subtract(new Vector2(0, size.y / 2))
            for (let y = 0; y <= size.y; y++)
            {
                this.paintingRaycastPoints.push(offsetNormalizedPosition.clone().add(new Vector2(0, y)).scale(Constants.CELL_SIZE))
            }
            
            this.paintingRaycastPoints[0].y += Constants.SLIGHTLY_WORSE_EPSILON
            this.paintingRaycastPoints[this.paintingRaycastPoints.length - 1].y -= Constants.SLIGHTLY_WORSE_EPSILON
        }
        else
        {
            const offsetNormalizedPosition = normalizedPosition.subtract(new Vector2(size.x / 2, 0))
            for (let x = 0; x <= size.x; x++)
            {
                this.paintingRaycastPoints.push(offsetNormalizedPosition.clone().add(new Vector2(x, 0)).scale(Constants.CELL_SIZE))
            }

            this.paintingRaycastPoints[0].x += Constants.SLIGHTLY_WORSE_EPSILON
            this.paintingRaycastPoints[this.paintingRaycastPoints.length - 1].x -= Constants.SLIGHTLY_WORSE_EPSILON
        }

        this.setDepth(1000)
        this.setLightStatus(false)
    }

    public setLightStatus(isFullyLit: boolean): void {
        if (this.isFullyLit === isFullyLit) return

        if (isFullyLit)
        {
            this.fillColor = new Color(255, 0, 0).color
            this.playScene.paintingLit.invoke()
        }
        else
        {
            this.fillColor = new Color(0, 0, 0).color
            this.playScene.paintingUnlit.invoke()
        }

        this.isFullyLit = isFullyLit
    }
}

export default Painting