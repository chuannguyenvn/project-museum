import Vector2 = Phaser.Math.Vector2
import Sprite = Phaser.GameObjects.Sprite
import PlayScene from "../scenes/PlayScene"
import Constants from "../configs/Constants"
import SpriteKey from "../configs/SpriteKey"
import StateMachine from "../utilities/StateMachine"

class Light extends Sprite
{
    public stateMachine: StateMachine<LightState> = new StateMachine<LightState>(LightState.Init)

    public angle: number
    public scene: PlayScene

    constructor(scene: PlayScene) {
        super(scene, 0, 0, SpriteKey.LIGHT)
        scene.add.existing(this)

        this.scene = scene

        this.stateMachine.changeState(LightState.Moving)
        this.scale = 0.1
    }

    public handlePointerUp(): void {
        if (this.stateMachine.currentState === LightState.Moving)
        {
            this.stateMachine.changeState(LightState.Rotating)
        }
        else if (this.stateMachine.currentState === LightState.Rotating)
        {
            this.stateMachine.changeState(LightState.Idle)
        }
    }

    public handlePointerMove(pointerPosition: Vector2): void {
        if (this.stateMachine.currentState === LightState.Moving)
            this.setPosition(pointerPosition.x, pointerPosition.y)
        else if (this.stateMachine.currentState === LightState.Rotating)
        {
            const startPos = new Vector2(this.x / Constants.CELL_SIZE, this.y / Constants.CELL_SIZE)
            this.raycast(startPos.clone(), (pointerPosition.clone().scale(1 / Constants.CELL_SIZE).subtract(startPos.clone())).normalize())
        }
    }

    public castLight(): void {
        // const cornersInRange = query(this.scene.allWorldCorners)
        //     .where((corner) =>)
    }

    public raycast(startNormalized: Vector2, directionNormalized: Vector2): Vector2 | null {
        const unitStepSize = new Vector2(
            Math.sqrt(1 + (directionNormalized.y / directionNormalized.x) * (directionNormalized.y / directionNormalized.x)),
            Math.sqrt(1 + (directionNormalized.x / directionNormalized.y) * (directionNormalized.x / directionNormalized.y)))

        const currentFlagCoord = new Vector2(Math.floor(startNormalized.x), Math.floor(startNormalized.y))
        const flagStep = new Vector2(0, 0)
        let raySoFar = new Vector2(0, 0)

        if (directionNormalized.x > 0)
        {
            flagStep.x = 1
            raySoFar.x = (currentFlagCoord.x + 1 - startNormalized.x) * unitStepSize.x
        }
        else
        {
            flagStep.x = -1
            raySoFar.x = (startNormalized.x - currentFlagCoord.x) * unitStepSize.x
        }

        if (directionNormalized.y > 0)
        {
            flagStep.y = 1
            raySoFar.y = (currentFlagCoord.y + 1 - startNormalized.y) * unitStepSize.y
        }
        else
        {
            flagStep.y = -1
            raySoFar.y = (startNormalized.y - currentFlagCoord.y) * unitStepSize.y
        }

        let distance = 0
        const maxDistance = 10000
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
            if (currentFlagCoord.x >= 0 && currentFlagCoord.x < this.scene.currentLevel.levelSize.x &&
                currentFlagCoord.y >= 0 && currentFlagCoord.y < this.scene.currentLevel.levelSize.y)
            {
                if (this.scene.blockFlags[currentFlagCoord.x][currentFlagCoord.y])
                {
                    const s = new Vector2(startNormalized.x, startNormalized.y)
                    const result = startNormalized.add(directionNormalized.scale(distance))
                    // console.log(result)

                    this.drawRay(
                        new Vector2(
                            s.x * Constants.CELL_SIZE,
                            s.y * Constants.CELL_SIZE),
                        new Vector2(
                            result.x * Constants.CELL_SIZE,
                            result.y * Constants.CELL_SIZE))

                    return result
                }
            }
            else break
        }

        this.drawRay(
            new Vector2(
                startNormalized.x * Constants.CELL_SIZE,
                startNormalized.y * Constants.CELL_SIZE),
            new Vector2(
                (directionNormalized.x * 1000 + startNormalized.x) * Constants.CELL_SIZE,
                (directionNormalized.y * 1000 + startNormalized.y) * Constants.CELL_SIZE))

        return null
    }

    private drawRay(start: Vector2, end: Vector2) {
        this.scene.add.line(0, 0, start.x, start.y, end.x, end.y, 0xffffff).setOrigin(0, 0)
        this.scene.add.arc(end.x, end.y, 5, 0, 359, false, 0xff0000)
    }
}

enum LightState
{
    Init,
    Moving,
    Rotating,
    Idle,
}

export default Light