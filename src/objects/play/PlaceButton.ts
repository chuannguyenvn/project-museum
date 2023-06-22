import ButtonPrefab from "../prefabs/ButtonPrefab"
import PlayScene from "../../scenes/PlayScene"
import Vector2 = Phaser.Math.Vector2

class PlaceButton extends ButtonPrefab
{
    private playScene: PlayScene

    constructor(scene: PlayScene) {
        super(scene)
        this.playScene = scene
        
        this.setAnchor(new Vector2(0.5, 0))
        this.setOffset(new Vector2(0, 100))
    }
}

export default PlaceButton