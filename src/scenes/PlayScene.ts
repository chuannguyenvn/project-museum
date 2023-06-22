import WallBlock from "../objects/WallBlock"
import GameManager from "../managers/GameManager"
import ILevelData from "../interfaces/ILevelData"
import SpotLight from "../objects/SpotLight"
import SpriteKey from "../configs/SpriteKey"
import FileLookUp from "../configs/FileLookUp"
import Vector2 = Phaser.Math.Vector2

class PlayScene extends Phaser.Scene
{
    public currentLevel: ILevelData

    public allBlocks: WallBlock[]
    public allWorldCorners: Vector2[]
    public blockFlags: boolean[][]

    public light: SpotLight

    constructor() {
        super({
            key: 'PlayScene'
        })
        //
        // console.log(new Vector2(1, 1).angle())
        // console.log(new Vector2(1, -1).angle())
    }

    private preload(): void {
        this.load.image(SpriteKey.LIGHT, FileLookUp[SpriteKey.LIGHT])
    }

    private create(): void {
        this.light = new SpotLight(this)
        this.currentLevel = GameManager.GetCurrentLevel()

        this.allBlocks = []
        this.allWorldCorners = []
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

        this.input.on(Phaser.Input.Events.POINTER_MOVE, () => {
                this.light.handlePointerMove(this.input.activePointer.position)
            }
        )

        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.light.handlePointerUp()
        })
    }
}

export default PlayScene