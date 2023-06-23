import SpriteKey from "../../configs/SpriteKey"
import {GameEvent} from "../../utilities/Event"
import {Scene} from "phaser"
import NineSlice = Phaser.GameObjects.NineSlice
import Color = Phaser.Display.Color
import Vector2 = Phaser.Math.Vector2

class ButtonPrefab extends NineSlice
{
    public clicked: GameEvent = new GameEvent()
    public pointerOverTint: Color = new Color(225, 225, 225)
    public pointerOutTint: Color = new Color(255, 255, 255)
    public pointerDownTint: Color = new Color(160, 160, 160)

    private anchor: Vector2 = new Vector2(0.5, 0.5)
    private pivot: Vector2 = new Vector2(0.5, 0.5)
    private offset: Vector2 = new Vector2(0, 0)

    constructor(scene: Scene, spriteKey: SpriteKey = SpriteKey.DEFAULT_BUTTON) {
        super(scene, 0, 0, spriteKey, undefined, 136, 136, 15, 15, 15, 15)
        scene.add.existing(this)

        this.setInteractive()
        this.setTintFill(this.pointerOutTint.color)
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.setTintFill(this.pointerDownTint.color))
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.clicked.invoke()
            this.setTintFill(this.pointerOverTint.color)
        })
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.setTintFill(this.pointerOverTint.color))
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.setTintFill(this.pointerOutTint.color))

        this.depth = 10000

        addEventListener("resize", (event) => {
            this.handleWindowSizeChange()
        })

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
            this.clicked.invoke()
        })
        
        this.setAnchor(0.5, 0.5)
        this.setPivot(0.5, 0.5)
    }

    private handleWindowSizeChange(): void {
        this.setAnchor(this.anchor.x, this.anchor.y)
        this.setPivot(this.pivot.x, this.pivot.y)
        this.setOffset(this.offset.x, this.offset.y)
    }

    // Relative to the screen
    public setAnchor(anchorX: number, anchorY: number): void {
        this.anchor = new Vector2(anchorX, anchorY)

        const mainCamera = this.scene.cameras.main
        this.x = mainCamera.midPoint.x + mainCamera.displayWidth * (anchorX - 0.5)
        this.y = mainCamera.midPoint.y + mainCamera.displayHeight * (anchorY - 0.5)
    }

    // Relative to the anchor
    public setPivot(pivotX: number, pivotY: number): void {
        this.pivot = new Vector2(pivotX, pivotY)

        this.setOrigin(pivotX, pivotY)
    }

    // Relative to the pivot, in pixels
    public setOffset(offsetX: number, offsetY: number): void {
        this.offset = new Vector2(offsetX, offsetY)

        this.x += offsetX
        this.y += offsetY
    }
}

export default ButtonPrefab