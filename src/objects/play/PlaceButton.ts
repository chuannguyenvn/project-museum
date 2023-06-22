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
        this.setAnchor(new Vector2(0, 0.5))
        this.setPivot(new Vector2(0, 0.5))
        this.setOffset(new Vector2(100, 0))
    }
}

export default PlaceButton