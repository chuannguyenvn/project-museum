interface ILevelData
{
    levelNumber: number
    levelSize: IVectorLike
    wallLayout: IVectorLike[]
}

interface IVectorLike
{
    x: number,
    y: number
}

export default ILevelData