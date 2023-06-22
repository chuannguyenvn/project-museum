import WallBlock from "../objects/play/WallBlock"
import GameManager from "../managers/GameManager"
import ILevelData from "../interfaces/ILevelData"
import SpotLight from "../objects/play/SpotLight"
import SpriteKey from "../configs/SpriteKey"
import FileLookUp from "../configs/FileLookUp"
import Painting from "../objects/play/Painting"
import Convert from "../utilities/Convert"
import Boundary from "../objects/play/Boundary"
import Constants from "../configs/Constants"
import PlaceButton from "../objects/play/PlaceButton"
import Vector2 = Phaser.Math.Vector2
import Color = Phaser.Display.Color

class PlayScene extends Phaser.Scene
{
    public currentLevel: ILevelData

    public allBlocks: WallBlock[]
    public allWorldCorners: Vector2[]
    public allPaintings: Painting[]
    public blockFlags: boolean[][]

    public light: SpotLight

    constructor() {
        super({
            key: 'PlayScene'
        })
    }

    private preload(): void {
        this.load.image(SpriteKey.LIGHT, FileLookUp[SpriteKey.LIGHT])
        this.load.image(SpriteKey.DEFAULT_BUTTON, FileLookUp[SpriteKey.DEFAULT_BUTTON])
    }

    private create(): void {
        this.currentLevel = GameManager.GetCurrentLevel()

        this.cameras.main.zoom = 0.5
        this.cameras.main.centerOn(this.currentLevel.levelSize.x * Constants.CELL_SIZE / 2,
            this.currentLevel.levelSize.y * Constants.CELL_SIZE / 2)
        
        this.light = new SpotLight(this)
        this.light.setInteractive()
        this.input.setDraggable(this.light)
        
        this.allBlocks = []
        this.allWorldCorners = []
        this.allPaintings = []
        this.blockFlags = []

        for (let x = 0; x < this.currentLevel.levelSize.x; x++)
        {
            this.blockFlags.push([])
            for (let y = 0; y < this.currentLevel.levelSize.y; y++)
            {
                this.blockFlags[x].push(false)
            }
        }

        for (let i = 0; i < this.currentLevel.wallLayout.length; i++)
        {
            const wallBlock = new WallBlock(this, this.currentLevel.wallLayout[i], this.currentLevel.cornerLayout[i])
            this.allBlocks.push(wallBlock)

            this.allWorldCorners = this.allWorldCorners.concat(wallBlock.worldCornerPositions)

            for (let j = 0; j < this.currentLevel.wallLayout[i].length; j++)
            {
                const wallUnit = this.currentLevel.wallLayout[i][j]
                this.blockFlags[wallUnit.x][wallUnit.y] = true
            }
        }

        for (let i = 0; i < this.currentLevel.paintingLayout.length; i++)
        {
            const paintingPosition = Convert.ToVector2(this.currentLevel.paintingLayout[i].position)
            const paintingSize = Convert.ToVector2(this.currentLevel.paintingLayout[i].size)
            const painting = new Painting(this, paintingPosition, paintingSize, new Color(255, 0, 0))
            this.allPaintings.push(painting)
        }

        new Boundary(this, Convert.ToVector2(this.currentLevel.levelSize))

        this.input.on(Phaser.Input.Events.POINTER_MOVE, () => {
            const pointerScreenPosition = this.input.activePointer.position.clone()
            this.light.handlePointerMove(this.cameras.main.getWorldPoint(pointerScreenPosition.x, pointerScreenPosition.y))
        })

        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.light.handlePointerUp()
        })

        new PlaceButton(this)
    }

    // update(time: number, delta: number) {
    //     console.log(this.input.mousePointer.position)
    //     console.log(this.cameras.main.getWorldPoint(this.input.mousePointer.position.x, this.input.mousePointer.position.y))
    // }
}

export default PlayScene