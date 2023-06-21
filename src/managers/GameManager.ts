import ILevelData from "../interfaces/ILevelData"
import FileLookUp from "../configs/FileLookUp"
import JsonKey from "../configs/JsonKey"

class GameManager
{
    public static GetCurrentLevel(): ILevelData {
        return FileLookUp[JsonKey.LEVEL_DATA][0] as ILevelData
    }
}

export default GameManager