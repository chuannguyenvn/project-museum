import WallBlock from "../objects/WallBlock"
import GameManager from "../managers/GameManager"
import ILevelData from "../interfaces/ILevelData"
import Light from "../objects/Light"

class PlayScene extends Phaser.Scene
{
    public currentLevel: ILevelData

    public allBlocks: WallBlock[]
    public blockFlags: boolean[][]

    public light: Light

    constructor() {
        super({
            key: 'PlayScene'
        })
    }

    private preload(): void {
    }

    private create(): void {
        this.light = new Light(this)
        this.currentLevel = GameManager.GetCurrentLevel()

        this.allBlocks = []
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
            this.allBlocks.push(new WallBlock(this, this.currentLevel.wallLayout[i], this.currentLevel.cornerLayout[i]))

            for (let j = 0; j < this.currentLevel.wallLayout[i].length; j++)
            {
                const wallUnit = this.currentLevel.wallLayout[i][j]
                this.blockFlags[wallUnit.x][wallUnit.y] = true
            }
        }

        console.log(this.blockFlags)

        this.input.on(Phaser.Input.Events.POINTER_MOVE, () =>
            this.light.update(this.input.mousePointer.position)
        )
    }
}

export default PlayScene