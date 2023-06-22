import Phaser from "phaser"
import LevelSelectionScene from "../scenes/LevelSelectionScene"
import PlayScene from "../scenes/PlayScene"

const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
    title: 'Project Museum',
    width: 960,
    height: 540,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    scene: [LevelSelectionScene, PlayScene],
    backgroundColor: 0x111111,
}

export default GAME_CONFIG