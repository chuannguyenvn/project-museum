import IVectorLike from "./IVectorLike"

interface ILevelData
{
    levelNumber: number
    levelSize: IVectorLike
    wallLayout: IVectorLike[][]
    cornerLayout: IVectorLike[][]
    paintingLayout: IPaintingLayoutData[]
    wallColor: string
    groundColor: string
}

interface IPaintingLayoutData
{
    position: IVectorLike
    size: IVectorLike
    color: string
}

export default ILevelData