import WallBlock from "../objects/WallBlock"
import GameManager from "../managers/GameManager"

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

        for (let i = 0; i < currentLevel.wallLayout.length; i++)
        {
            new WallBlock(this, currentLevel.wallLayout[i], currentLevel.cornerLayout[i])
        }
    }
}

export default PlayScene