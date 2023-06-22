import IVectorLike from "./IVectorLike"

interface ILevelData
{
    levelNumber: number
    levelSize: IVectorLike
    wallLayout: IVectorLike[][]
    cornerLayout: IVectorLike[][]
    paintingLayout: IPaintingLayoutData[]
}

interface IPaintingLayoutData
{
    position: IVectorLike
    size: IVectorLike
}

export default ILevelData