import Vector2 = Phaser.Math.Vector2
import Line = Phaser.GameObjects.Line
import Arc = Phaser.GameObjects.Arc
import {Scene} from "phaser"

class Grid extends Phaser.GameObjects.GameObject
{
    private size: Vector2
    public blocks: Vector2[]
    public corners: Vector2[]
    private blockFlags: boolean[][] = []
    private cellSize: number = 50
    private line: Line
    private arc: Arc

    constructor(scene: Scene, size: Vector2, blocks: Vector2[], corners: Vector2[]) {
        super(scene, '')
        this.size = size
        this.blocks = blocks
        this.corners = corners

        for (let x = 0; x < size.x; x++)
        {
            this.blockFlags.push([])
            for (let y = 0; y < size.y; y++)
            {
                this.blockFlags[x].push(false)
            }
        }

        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blockFlags[this.blocks[i].x][this.blocks[i].y] = true
        }

        this.draw()
        this.line = this.scene.add.line(0, 0, 0, 0, 0, 0, 0xffffff).setOrigin(0, 0)
        this.line.depth = 100

        const grid = this.scene.add.grid(0, 0, 600, 600, this.cellSize, this.cellSize, 0x111111)
        grid.depth = -100
        grid.setOrigin(0, 0)

        this.arc = this.scene.add.arc(0, 0, 5, 0, 359, false, 0xff0000)
        this.arc.depth = 1000
    }

    public draw(): void {
        this.blocks.forEach((block) => {
            this.scene.add.rectangle((block.x + 0.5) * this.cellSize, (block.y + 0.5) * this.cellSize, this.cellSize, this.cellSize, 0xeeeeee)
        })
    }

    public update(mousePos: Vector2) {
        if (this.raycast(new Vector2(6, 6), mousePos.scale(1 / this.cellSize).subtract(new Vector2(6, 6)).normalize())) console.log("yes")
        else console.log('no')
    }

    public raycast(start: Vector2, direction: Vector2): Vector2 | null {
        const unitStepSize = new Vector2(
            Math.sqrt(1 + (direction.y / direction.x) * (direction.y / direction.x)),
            Math.sqrt(1 + (direction.x / direction.y) * (direction.x / direction.y)))

        const currentFlagCoord = new Vector2(Math.floor(start.x), Math.floor(start.y))
        const flagStep = new Vector2(0, 0)
        let raySoFar = new Vector2(0, 0)

        if (direction.x > 0)
        {
            flagStep.x = 1
            raySoFar.x = (currentFlagCoord.x + 1 - start.x) * unitStepSize.x
        }
        else
        {
            flagStep.x = -1
            raySoFar.x = (start.x - currentFlagCoord.x) * unitStepSize.x
        }

        if (direction.y > 0)
        {
            flagStep.y = 1
            raySoFar.y = (currentFlagCoord.y + 1 - start.y) * unitStepSize.y
        }
        else
        {
            flagStep.y = -1
            raySoFar.y = (start.y - currentFlagCoord.y) * unitStepSize.y
        }

        let distance = 0
        const maxDistance = 100
        let a = ""
        while (raySoFar.x < maxDistance && raySoFar.y < maxDistance)
        {
            if (raySoFar.x < raySoFar.y)
            {
                currentFlagCoord.x += flagStep.x
                distance = raySoFar.x
                raySoFar.x += unitStepSize.x
            }
            else
            {
                currentFlagCoord.y += flagStep.y
                distance = raySoFar.y
                raySoFar.y += unitStepSize.y
            }

            a += `[${currentFlagCoord.x}, ${currentFlagCoord.y}]`
            if (currentFlagCoord.x >= 0 && currentFlagCoord.x < this.size.x &&
                currentFlagCoord.y >= 0 && currentFlagCoord.y < this.size.y)
            {
                if (this.blockFlags[currentFlagCoord.x][currentFlagCoord.y])
                {
                    const s = new Vector2(start.x, start.y)
                    const result = start.add(direction.scale(distance))
                    console.log(result)
                    this.arc.x = result.x * this.cellSize
                    this.arc.y = result.y * this.cellSize
                    this.line.setTo(s.x * this.cellSize, s.y * this.cellSize, result.x * this.cellSize, result.y * this.cellSize)
                    return result
                }
            }
            else break
        }

        this.line.setTo(start.x * this.cellSize, start.y * this.cellSize, (direction.x * 1000 + start.x) * this.cellSize, (direction.y * 1000 + start.y) * this.cellSize)
        console.log(a)
        this.arc.x = 100000
        this.arc.y = 1000000
        return null
    }
}

export default Grid