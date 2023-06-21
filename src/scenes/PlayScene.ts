import Wall from "../objects/Wall"
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
        for (let i = 0; i < currentLevel.wallLayout.length; i++)
        {
            new Wall(this, new Vector2(currentLevel.wallLayout[i].x, currentLevel.wallLayout[i].y))
        }
    }
}

export default PlayScene