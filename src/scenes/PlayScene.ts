import JsonKey from "../configs/JsonKey"
import FileLookUp from "../configs/FileLookUp"
import JsonHelper from "../utilities/JsonHelper"
import ILevelData from "../interfaces/ILevelData"

class PlayScene extends Phaser.Scene
{
    constructor() {
        super({
            key: 'PlayScene'
        })
    }

    private create(): void {
        const levelDataArray = FileLookUp[JsonKey.LEVEL_DATA] as ILevelData[]
        
        for (let i = 0; i <levelDataArray.length; i++)
        {
            console.log(levelDataArray[i].levelNumber)
        }
    }
}

export default PlayScene