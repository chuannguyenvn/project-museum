import Polygon = Phaser.GameObjects.Polygon
import Vector2 = Phaser.Math.Vector2
import PlayScene from "../../scenes/PlayScene"
import Phaser from "phaser"
import {LightState, SpotLight} from "./SpotLight"
import Maths from "../../utilities/Maths"

class LightArea extends Polygon
{
    private playScene: PlayScene

    constructor(scene: PlayScene, ownerLight: SpotLight) {
        super(scene, 0, 0, [new Vector2(0, 0)], 0xeeeeee)
        this.scene.add.existing(this)
        this.playScene = scene

        this.setOrigin(0, 0)
        this.setAlpha(0.5)
        this.setDepth(100)

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            ownerLight.stateMachine.changeState(LightState.Rotating)

            const pointerScreenPosition = scene.input.activePointer.position.clone()
            const pointerWorldPosition = scene.cameras.main.getWorldPoint(pointerScreenPosition.x, pointerScreenPosition.y)
            const lightToPointerDirection = pointerWorldPosition.clone().subtract(new Vector2(ownerLight.x, ownerLight.y)).normalize()
            ownerLight.directionAngleOffset = Maths.SignedDegreeAngleBetween(ownerLight.direction, lightToPointerDirection)
        })
    }

    public changeShape(lightPolygonPath: Vector2[]): void {
        this.setInteractive(new Phaser.Geom.Polygon(lightPolygonPath), Phaser.Geom.Polygon.Contains)
        this.setTo(lightPolygonPath)
    }
}

export default LightArea