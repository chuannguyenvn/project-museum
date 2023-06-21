import WallBlock from "../objects/WallBlock"
import GameManager from "../managers/GameManager"
import Vector2 = Phaser.Math.Vector2

class PlayScene extends Phaser.Scene
{
    constructor() {
        super({
            key: 'PlayScene'
        })
    }

    private preload(): void {
    }

    private create(): void {
        const currentLevel = GameManager.GetCurrentLevel()
        console.log(currentLevel)
        for (let i = 0; i < currentLevel.wallLayout.length; i++)
        {
            new WallBlock(this, currentLevel.wallLayout[i], currentLevel.cornerLayout[i])
        }
    }
}

export default PlayScene