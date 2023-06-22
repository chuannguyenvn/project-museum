import SpriteKey from "../../configs/SpriteKey"
import {GameEvent} from "../../utilities/Event"
import {Scene} from "phaser"
import NineSlice = Phaser.GameObjects.NineSlice
import Color = Phaser.Display.Color
import Vector2 = Phaser.Math.Vector2

class ButtonPrefab extends NineSlice
{
    public clicked: GameEvent = new GameEvent()
    public pointerOverTint: Color = new Color(230, 230, 230)
    public pointerOutTint: Color = new Color(255, 255, 255)

    constructor(scene: Scene, spriteKey: SpriteKey = SpriteKey.DEFAULT_BUTTON) {
        super(scene, 0, 0, spriteKey)
        scene.add.existing(this)

        this.setInteractive()
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.clicked.invoke())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.setTintFill(this.pointerOverTint.color))
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.setTintFill(this.pointerOutTint.color))
        this.depth = 10000

        this.setOrigin(0.5, 0)
    }

    // Relative to the screen
    public setAnchor(anchor: Vector2): void {
        const mainCamera = this.scene.cameras.main
        this.x = mainCamera.midPoint.x + mainCamera.displayWidth * (anchor.x - 0.5)
        this.y = mainCamera.midPoint.y + mainCamera.displayHeight * (anchor.y - 0.5)
    }

    // Relative to the anchor
    public setPivot(pivot: Vector2): void {
        this.setOrigin(pivot.x, pivot.y)
    }

    // Relative to the pivot, in pixels
    public setOffset(pixelPosition: Vector2): void {
        const mainCamera = this.scene.cameras.main
        this.x += pixelPosition.x
        this.y += pixelPosition.y
    }
}

export default ButtonPrefab