import ButtonPrefab from "../prefabs/ButtonPrefab"
import LevelSelectionScene from "../../scenes/LevelSelectionScene"
import SpriteKey from "../../configs/SpriteKey"
import Text = Phaser.GameObjects.Text

class LevelButton extends ButtonPrefab
{
    private levelSelectionScene: LevelSelectionScene

    private text: Text

    constructor(levelSelectionScene: LevelSelectionScene, levelNumber: number, spriteKey: SpriteKey = SpriteKey.DEFAULT_BUTTON) {
        super(levelSelectionScene, spriteKey)
        this.levelSelectionScene = levelSelectionScene

        this.text = this.levelSelectionScene.add.text(this.x, this.y, levelNumber.toString())
        this.text.setFill(0xff0000)
        this.text.depth = 10001
        this.text.setOrigin(0.5, 0.5)
    }

    public override setAnchor(anchor: Phaser.Math.Vector2) {
        super.setAnchor(anchor)
        if (!this.text) return
        this.text.x = this.x
        this.text.y = this.y
    }

    public override setPivot(pivot: Phaser.Math.Vector2) {
        super.setPivot(pivot)
        if (!this.text) return
        this.text.x = this.x
        this.text.y = this.y
    }

    public override setOffset(offset: Phaser.Math.Vector2) {
        super.setOffset(offset)
        if (!this.text) return
        this.text.x = this.x
        this.text.y = this.y
    }
}

export default LevelButton