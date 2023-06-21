import IVectorLike from "../interfaces/IVectorLike"
import Vector2 = Phaser.Math.Vector2

class Convert
{
    public static ToVector2(vectorLike: IVectorLike) {
        return new Vector2(vectorLike.x, vectorLike.y)
    }
}

export default Convert