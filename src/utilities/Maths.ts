import Vector2 = Phaser.Math.Vector2

class Maths
{
    public static DegreeAngleBetween(v1: Vector2, v2: Vector2): number {
        const v1Normalized = v1.clone()
        const v2Normalized = v2.clone()

        return Math.acos((v1Normalized.x * v2Normalized.x + v1Normalized.y * v2Normalized.y) / (v1.length() * v2.length())) * Phaser.Math.RAD_TO_DEG
    }

    // Assume that the point already lies on the line formed by the two other points.
    public static IsPointBetween(pointToCheck: Vector2, firstPoint: Vector2, secondPoints: Vector2): boolean {
        const firstToSecond = Phaser.Math.Distance.BetweenPoints(firstPoint, secondPoints)
        const pointToFirst = Phaser.Math.Distance.BetweenPoints(pointToCheck, firstPoint)
        const pointToSecond = Phaser.Math.Distance.BetweenPoints(pointToCheck, secondPoints)

        return Math.abs(pointToFirst + pointToSecond - firstToSecond) < Phaser.Math.EPSILON
    }
}

export default Maths