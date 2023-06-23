import GameObject = Phaser.GameObjects.GameObject
import Vector2 = Phaser.Math.Vector2
import Polygon = Phaser.GameObjects.Polygon
import Color = Phaser.Display.Color
import PlayScene from "../../scenes/PlayScene"
import GameObjectType from "../../configs/GameObjectType"
import Constants from "../../configs/Constants"
import IVectorLike from "../../interfaces/IVectorLike"
import Convert from "../../utilities/Convert"
import query from "../../utilities/Query"

class WallBlock extends GameObject
{
    // The positions from LevelData.json, as-is
    public readonly normalizedCellPositions: Vector2[]
    public readonly normalizedCornerPositions: Vector2[]

    // The positions scaled based on normalizedPosition and CELL_SIZE
    public readonly worldCellPositions: Vector2[] = []
    public readonly worldCornerPositions: Vector2[] = []

    private wallPolygon: Polygon

    constructor(scene: PlayScene, normalizedCellPositions: IVectorLike[], normalizedCornerPositions: IVectorLike[], colorString: string) {
        super(scene, GameObjectType.WALL)
        scene.add.existing(this)

        this.normalizedCellPositions = query(normalizedCellPositions)
            .select(Convert.ToVector2)
            .toArray()
        this.normalizedCornerPositions = query(normalizedCornerPositions)
            .select(Convert.ToVector2)
            .toArray()

        this.worldCellPositions = query(normalizedCellPositions)
            .select((vectorLike) => new Vector2((vectorLike.x) * Constants.CELL_SIZE, (vectorLike.y) * Constants.CELL_SIZE))
            .toArray()
        this.worldCornerPositions = query(normalizedCornerPositions)
            .select((vectorLike) => new Vector2((vectorLike.x) * Constants.CELL_SIZE, (vectorLike.y) * Constants.CELL_SIZE))
            .toArray()

        this.wallPolygon = scene.add.polygon(0, 0, this.worldCornerPositions, Color.HexStringToColor(colorString).color)
        this.wallPolygon.setOrigin(0, 0)
        this.wallPolygon.setDepth(9999)

        for (let i = 0; i < this.worldCellPositions.length; i++)
        {
            this.scene.matter.add.rectangle(
                this.worldCellPositions[i].x + Constants.CELL_SIZE / 2,
                this.worldCellPositions[i].y + Constants.CELL_SIZE / 2,
                Constants.CELL_SIZE,
                Constants.CELL_SIZE,
                {isStatic: true})
        }
    }
}

export default WallBlock