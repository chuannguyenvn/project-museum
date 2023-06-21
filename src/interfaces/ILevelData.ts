import IVectorLike from "./IVectorLike"

interface ILevelData
{
    levelNumber: number
    levelSize: IVectorLike
    wallLayout: IVectorLike[][]
    cornerLayout: IVectorLike[][]
}

export default ILevelData