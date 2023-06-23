import {Scene} from "phaser"
import SceneKey from "../configs/SceneKey"
import PlayButton from "../objects/play/PlayButton"


class WelcomeScene extends Scene
{
    constructor() {
        super({
            key: SceneKey.WELCOME
        })
    }

    private create(): void {

        const playButton = new PlayButton(this)
        playButton.clicked.subscribe(this.changeToLevelSelectionScene.bind(this))
    }

    private changeToLevelSelectionScene(): void {
        this.scene.stop(SceneKey.WELCOME)
        this.scene.start(SceneKey.LEVEL_SELECTION)
    }
}

export default WelcomeScene