import WallBlock from "../objects/WallBlock"
import GameManager from "../managers/GameManager"
import ILevelData from "../interfaces/ILevelData"
import SpotLight from "../objects/SpotLight"
import SpriteKey from "../configs/SpriteKey"
import FileLookUp from "../configs/FileLookUp"
import Painting from "../objects/Painting"
import Convert from "../utilities/Convert"
import Boundary from "../objects/Boundary"
import Constants from "../configs/Constants"
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
    public cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys

    constructor() {
        super({
            key: 'PlayScene'
        })
    }

    private preload(): void {
        this.load.image(SpriteKey.LIGHT, FileLookUp[SpriteKey.LIGHT])
    }

    private create(): void {
        this.light = new SpotLight(this)
        this.light.setInteractive()
        this.input.setDraggable(this.light)

        this.currentLevel = GameManager.GetCurrentLevel()

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
        
        this.cameras.main.zoom = 0.5
        this.cameras.main.centerOn(this.currentLevel.levelSize.x * Constants.CELL_SIZE / 2,
            this.currentLevel.levelSize.y * Constants.CELL_SIZE / 2)

        this.input.on(Phaser.Input.Events.POINTER_MOVE, () => {
            const pointerScreenPosition = this.input.activePointer.position.clone()
            this.light.handlePointerMove(this.cameras.main.getWorldPoint(pointerScreenPosition.x, pointerScreenPosition.y))
        })

        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.light.handlePointerUp()
        })

        if (this.input.keyboard?.createCursorKeys())
            this.cursorKeys = this.input.keyboard?.createCursorKeys()
    }

    update(time: number, delta: number) {
        super.update(time, delta)

        if (this.cursorKeys.down.isDown)
        {
            this.cameras.main.scrollY += 1
        }
        if (this.cursorKeys.up.isDown)
        {
            this.cameras.main.scrollY -= 1
        }
        if (this.cursorKeys.right.isDown)
        {
            this.cameras.main.scrollX += 1
        }
        if (this.cursorKeys.left.isDown)
        {
            this.cameras.main.scrollX -= 1
        }
        console.log(this.cameras.main.scrollX + ", " + this.cameras.main.scrollY)
    }
}

export default PlayScene