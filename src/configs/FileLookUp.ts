import JsonKey from "./JsonKey"
import LevelData from '../data/LevelData.json'
import SpriteKey from "./SpriteKey"

const FileLookUp = {
    [JsonKey.LEVEL_DATA]: LevelData,
    [SpriteKey.LIGHT]: "../../assets/images/Light.png"
}

export default FileLookUp