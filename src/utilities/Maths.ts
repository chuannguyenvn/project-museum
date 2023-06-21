import Vector2 = Phaser.Math.Vector2

class Maths
{
    public static DegreeAngleBetween(v1: Vector2, v2: Vector2) {
        const v1Normalized = v1.clone().normalize()
        const v2Normalized = v2.clone().normalize()

        return Math.acos((v1Normalized.x * v2Normalized.x + v1Normalized.y * v2Normalized.y) / (v1.length() * v2.length())) * Phaser.Math.RAD_TO_DEG
    }
}

export default Maths