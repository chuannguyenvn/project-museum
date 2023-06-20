import Phaser from "phaser"
import GameScene from "./game"
import BitmapMask = Phaser.Display.Masks.BitmapMask
import Vector2 = Phaser.Math.Vector2

class Light extends Phaser.GameObjects.GameObject
{
    public spreadAngle: number = 60
    public lightAngle: number
    public overlay: Phaser.GameObjects.Graphics
    public maskGraphics: Phaser.GameObjects.Graphics
    public mask: BitmapMask
    public scene: GameScene

    constructor(scene: GameScene) {
        super(scene, '')

        this.scene = scene

        // this.overlay = scene.add.graphics()
        //
        // this.overlay.fillStyle(0x000000, 0.8).fillRect(0, 0, 800, 600)
        //
        // this.maskGraphics = scene.make.graphics()
        //
        // this.maskGraphics.fillStyle(0xffffff).fillRect(100, 100, 256, 256)
        // this.maskGraphics.fillStyle(0x000000).fillRect(100, 100, 128, 256)
        //
        // this.mask = new BitmapMask(scene, this.maskGraphics)
        //
        // this.mask.invertAlpha = true
        //
        // this.overlay.setMask(this.mask)
        //
        // scene.add.existing(this)
    }

    public moveToCursor(pointer: Phaser.Input.Pointer): void {
        this.overlay.clearMask(true)
        this.maskGraphics = this.scene.make.graphics()
        this.maskGraphics.fillStyle(0xffffff).fillRect(pointer.x - 128, pointer.y - 128, 256, 256)
        this.mask = new BitmapMask(this.scene, this.maskGraphics)
        this.mask.invertAlpha = true

        this.overlay.setMask(this.mask)
    }

    public update(mousePos: Vector2) {
        this.scene.grid.removeAllRays()
        this.lightAngle = mousePos.subtract(new Vector2(500, 500)).angle() * Phaser.Math.RAD_TO_DEG
        this.scene.grid.raycast(new Vector2(50, 50), new Vector2(1, 0).rotate(Phaser.Math.DEG_TO_RAD * (this.lightAngle + this.spreadAngle / 2)))
        this.scene.grid.raycast(new Vector2(50, 50), new Vector2(1, 0).rotate(Phaser.Math.DEG_TO_RAD * (this.lightAngle - this.spreadAngle / 2)))
    }

    public castLight(): void {
    }
}

export default Light