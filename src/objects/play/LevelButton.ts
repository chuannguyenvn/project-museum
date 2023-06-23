import ButtonPrefab from "../prefabs/ButtonPrefab"
import LevelSelectionScene from "../../scenes/LevelSelectionScene"
import SpriteKey from "../../configs/SpriteKey"

class LevelButton extends ButtonPrefab
{
    private levelSelectionScene: LevelSelectionScene
    
    constructor(levelSelectionScene: LevelSelectionScene, levelNumber: number, spriteKey: SpriteKey = SpriteKey.DEFAULT_BUTTON) {
        super(levelSelectionScene, spriteKey)
        this.levelSelectionScene = levelSelectionScene

        this.text.setFill(0xff0000)
    }
}

export default LevelButton