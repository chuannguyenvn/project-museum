import Polygon = Phaser.GameObjects.Polygon
import Vector2 = Phaser.Math.Vector2
import PlayScene from "../../scenes/PlayScene"
import Phaser from "phaser"

class LightArea extends Polygon
{
    constructor(scene: PlayScene, lightPolygonPath: Vector2[]) {
        super(scene, 0, 0, lightPolygonPath, 0xeeeeee)
        this.scene.add.existing(this)
        
        this.setInteractive()
        
        this.setOrigin(0, 0)
        this.setAlpha(0.5)
        this.setDepth(100)
    }
}

export default LightArea