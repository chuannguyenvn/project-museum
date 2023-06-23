import Phaser from "phaser"
import LevelSelectionScene from "../scenes/LevelSelectionScene"
import PlayScene from "../scenes/PlayScene"
import WelcomeScene from "../scenes/WelcomeScene"

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
    title: 'Project Museum',
    width: 960,
    height: 540,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    scene: [WelcomeScene, LevelSelectionScene, PlayScene],
    backgroundColor: 0x111111,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
}

export default GAME_CONFIG