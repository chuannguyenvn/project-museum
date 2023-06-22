import Vector2 = Phaser.Math.Vector2
import Sprite = Phaser.GameObjects.Sprite
import Polygon = Phaser.GameObjects.Polygon
import Line = Phaser.GameObjects.Line
import Arc = Phaser.GameObjects.Arc
import PlayScene from "../scenes/PlayScene"
import Constants from "../configs/Constants"
import SpriteKey from "../configs/SpriteKey"
import StateMachine from "../utilities/StateMachine"
import query from "../utilities/Query"
import Convert from "../utilities/Convert"
import Maths from "../utilities/Maths"

class SpotLight extends Sprite
{
    public stateMachine: StateMachine<LightState> = new StateMachine<LightState>(LightState.Init)

    public direction: Vector2
    public scene: PlayScene

    private lightPolygon: Polygon
    private raycastLines: Line[] = []
    private rayCastArc: Arc[] = []

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
        {
            this.setPosition(pointerPosition.x, pointerPosition.y)
        }
        else if (this.stateMachine.currentState === LightState.Rotating)
        {
            this.direction = pointerPosition.clone().subtract(new Vector2(this.x, this.y)).normalize()
            this.castLight()
        }
    }

    public castLight(): void {
        this.raycastLines.forEach((line) => line.destroy())
        this.raycastLines = []

        this.rayCastArc.forEach((arc) => arc.destroy())
        this.rayCastArc = []

        const cornersInRange = query(this.scene.allWorldCorners)
            .select(Convert.ToVector2)
            .where((corner) => {
                const cornerDirection = (corner.clone().subtract(new Vector2(this.x, this.y))).normalize()
                const deltaAngle = Maths.DegreeAngleBetween(
                    new Vector2(this.direction.x, this.direction.y), cornerDirection)

                return Math.abs(deltaAngle) < Constants.LIGHT_SPREAD_ANGLE / 2
            })
            .toArray()

        let lightPolygonPath = []
        const normalizedLightPosition = new Vector2(this.x / Constants.CELL_SIZE, this.y / Constants.CELL_SIZE)
        for (let i = 0; i < cornersInRange.length; i++)
        {
            const currentCorner = cornersInRange[i]
            const nextCorner = cornersInRange[(i + 1) % cornersInRange.length]
            const offset = 0.001

            // Corner points are always counter-clockwise ordered

            /*
               Changing y means 
                _| or  _
                      |
               => Raycast to NW and SE of point
            */
            if (currentCorner.y === nextCorner.y)
            {
                const nwRaycastTarget = new Vector2(currentCorner.x - this.x - offset, currentCorner.y - this.y - offset).normalize()
                const seRaycastTarget = new Vector2(currentCorner.x - this.x + offset, currentCorner.y - this.y + offset).normalize()

                lightPolygonPath.push(this.raycast(normalizedLightPosition.clone(), nwRaycastTarget))
                lightPolygonPath.push(this.raycast(normalizedLightPosition.clone(), seRaycastTarget))
            }

            /*
               Changing x means
                |_ or  _
                        |
               => Raycast to NE and SW of point
            */
            else
            {
                const neRaycastTarget = new Vector2(currentCorner.x - this.x + offset, currentCorner.y - this.y - offset).normalize()
                const swRaycastTarget = new Vector2(currentCorner.x - this.x - offset, currentCorner.y - this.y + offset).normalize()

                lightPolygonPath.push(this.raycast(normalizedLightPosition.clone(), neRaycastTarget))
                lightPolygonPath.push(this.raycast(normalizedLightPosition.clone(), swRaycastTarget))
            }
        }

        // Sort points by comparing the angle from point vector to one of the cone's vector
        lightPolygonPath = query(lightPolygonPath)
            .select(Convert.ToVector2)
            .orderByAscending((point) => (Maths.DegreeAngleBetween(point.clone().subtract(new Vector2(this.x, this.y)), this.direction.clone().rotate(Phaser.Math.DEG_TO_RAD * Constants.LIGHT_SPREAD_ANGLE / 2))))
            .toArray()

        // Place one of the cone's raycast result at the start to make sure the whole array is CW (CCW?) ordered
        lightPolygonPath.unshift(this.raycast(normalizedLightPosition.clone(), this.direction.clone().rotate(Phaser.Math.DEG_TO_RAD * Constants.LIGHT_SPREAD_ANGLE / 2)))
        lightPolygonPath.push(this.raycast(normalizedLightPosition.clone(), this.direction.clone().rotate(-Phaser.Math.DEG_TO_RAD * Constants.LIGHT_SPREAD_ANGLE / 2)))
        lightPolygonPath.push(new Vector2(this.x, this.y))

        if (this.lightPolygon) this.lightPolygon.destroy()
        this.lightPolygon = this.scene.add.polygon(0, 0, lightPolygonPath, 0xeeeeee)
        this.lightPolygon.setOrigin(0, 0)
        this.lightPolygon.setAlpha(0.5)
    }

    public raycast(normalizedStart: Vector2, normalizedDirection: Vector2): Vector2 {
        const unitStepSize = new Vector2(
            Math.sqrt(1 + (normalizedDirection.y / normalizedDirection.x) * (normalizedDirection.y / normalizedDirection.x)),
            Math.sqrt(1 + (normalizedDirection.x / normalizedDirection.y) * (normalizedDirection.x / normalizedDirection.y)))

        const currentFlagCoord = new Vector2(Math.floor(normalizedStart.x), Math.floor(normalizedStart.y))
        const flagStep = new Vector2(0, 0)
        const raySoFar = new Vector2(0, 0)

        if (normalizedDirection.x > 0)
        {
            flagStep.x = 1
            raySoFar.x = (currentFlagCoord.x + 1 - normalizedStart.x) * unitStepSize.x
        }
        else
        {
            flagStep.x = -1
            raySoFar.x = (normalizedStart.x - currentFlagCoord.x) * unitStepSize.x
        }

        if (normalizedDirection.y > 0)
        {
            flagStep.y = 1
            raySoFar.y = (currentFlagCoord.y + 1 - normalizedStart.y) * unitStepSize.y
        }
        else
        {
            flagStep.y = -1
            raySoFar.y = (normalizedStart.y - currentFlagCoord.y) * unitStepSize.y
        }

        let distance = 0
        const maxDistance = 10000
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

            if (currentFlagCoord.x >= 0 && currentFlagCoord.x < this.scene.currentLevel.levelSize.x &&
                currentFlagCoord.y >= 0 && currentFlagCoord.y < this.scene.currentLevel.levelSize.y)
            {
                if (this.scene.blockFlags[currentFlagCoord.x][currentFlagCoord.y])
                {
                    const s = new Vector2(normalizedStart.x, normalizedStart.y)
                    const result = normalizedStart.add(normalizedDirection.scale(distance))

                    this.drawRay(
                        new Vector2(
                            s.x * Constants.CELL_SIZE,
                            s.y * Constants.CELL_SIZE),
                        new Vector2(
                            result.x * Constants.CELL_SIZE,
                            result.y * Constants.CELL_SIZE))

                    return new Vector2(
                        result.x * Constants.CELL_SIZE,
                        result.y * Constants.CELL_SIZE)
                }
            }
            else break
        }

        this.drawRay(
            new Vector2(
                normalizedStart.x * Constants.CELL_SIZE,
                normalizedStart.y * Constants.CELL_SIZE),
            new Vector2(
                (normalizedDirection.x * 1000 + normalizedStart.x) * Constants.CELL_SIZE,
                (normalizedDirection.y * 1000 + normalizedStart.y) * Constants.CELL_SIZE))

        return new Vector2(
            (normalizedDirection.x * 1000 + normalizedStart.x) * Constants.CELL_SIZE,
            (normalizedDirection.y * 1000 + normalizedStart.y) * Constants.CELL_SIZE)
    }

    private drawRay(start: Vector2, end: Vector2) {
        this.raycastLines.push(this.scene.add.line(0, 0, start.x, start.y, end.x, end.y, 0xffffff).setOrigin(0, 0))
        this.rayCastArc.push(this.scene.add.arc(end.x, end.y, 5, 0, 359, false, 0xff0000).setDepth(100))
    }
}

enum LightState
{
    Init,
    Moving,
    Rotating,
    Idle,
}

export default SpotLight