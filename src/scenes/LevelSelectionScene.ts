import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"
import FileLookUp from "../configs/FileLookUp"
import JsonKey from "../configs/JsonKey"
import LevelButton from "../objects/play/LevelButton"


class LevelSelectionScene extends Scene
{
    constructor() {
        super({
            key: SceneKey.LEVEL_SELECTION
        })
    }

    private create(): void {
        for (let i = 0; i < FileLookUp[JsonKey.LEVEL_DATA].length; i++)
        {
            const levelButton = new LevelButton(this, i + 1)
            levelButton.setOffset(i * 200, 0)
            levelButton.clicked.subscribe(() => {
                this.changeToPlayScene(i)
            })
        }
    }

    private changeToPlayScene(selectedLevelIndex: number): void {
        this.scene.stop(SceneKey.LEVEL_SELECTION)
        this.scene.start(SceneKey.PLAY, {
            selectedLevelIndex: selectedLevelIndex
        })
    }
}

export default LevelSelectionScene