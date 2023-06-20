import Phaser, {Scene} from "phaser"
import BitmapMask = Phaser.Display.Masks.BitmapMask

class Light extends Phaser.GameObjects.GameObject
{
    public coneAngle: number
    public lightAngle: number
    public overlay: Phaser.GameObjects.Graphics
    public maskGraphics: Phaser.GameObjects.Graphics
    public mask: BitmapMask
    public scene: Scene

    constructor(scene: Scene) {
        super(scene, '')

        this.scene = scene

        this.overlay = scene.add.graphics()

        this.overlay.fillStyle(0x000000, 0.8).fillRect(0, 0, 800, 600)

        this.maskGraphics = scene.make.graphics()

        this.maskGraphics.fillStyle(0xffffff).fillRect(100, 100, 256, 256)
        this.maskGraphics.fillStyle(0x000000).fillRect(100, 100, 128, 256)

        this.mask = new BitmapMask(scene, this.maskGraphics)

        this.mask.invertAlpha = true

        this.overlay.setMask(this.mask)

        scene.add.existing(this)
    }

    public moveToCursor(pointer: Phaser.Input.Pointer): void {
        this.overlay.clearMask(true)
        this.maskGraphics = this.scene.make.graphics()
        this.maskGraphics.fillStyle(0xffffff).fillRect(pointer.x - 128, pointer.y - 128, 256, 256)
        this.mask = new BitmapMask(this.scene, this.maskGraphics)
        this.mask.invertAlpha = true

        this.overlay.setMask(this.mask)

    }

    public castLight(): void {

    }
}

export default Light