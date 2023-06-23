import ButtonPrefab from "../prefabs/ButtonPrefab"
import WelcomeScene from "../../scenes/WelcomeScene"

class PlayButton extends ButtonPrefab
{
    private welcomeScene: WelcomeScene

    constructor(scene: WelcomeScene) {
        super(scene)
        this.welcomeScene = scene

        this.setSize(200, 200)
        this.setAnchor(0.5, 1)
        this.setPivot(0.5, 1)
        this.setOffset(0, -100)

        this.text.text = "Play"
    }
}

export default PlayButton