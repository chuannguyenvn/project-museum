import ButtonPrefab from "../prefabs/ButtonPrefab"
import PlayScene from "../../scenes/PlayScene"
import Vector2 = Phaser.Math.Vector2

class PlaceButton extends ButtonPrefab
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene)
        this.playScene = scene

        this.setSize(200, 200)
    }
}

export default PlaceButton