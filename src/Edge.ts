import Vector2 = Phaser.Math.Vector2

class Edge
{
    public startPoint: Vector2
    public endPoint: Vector2

    constructor(startPoint: Vector2, endPoint: Vector2) {
        this.startPoint = startPoint
        this.endPoint = endPoint
    }

    public intersect(other: Edge): Vector2 | null {
        const x1 = this.startPoint.x
        const y1 = this.startPoint.y
        const x2 = this.endPoint.x
        const y2 = this.endPoint.y

        const x3 = other.startPoint.x
        const y3 = other.startPoint.y
        const x4 = other.endPoint.x
        const y4 = other.endPoint.y

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

        // Check if the lines are parallel or coincident
        if (denominator === 0)
        {
            return null
        }

        const numeratorX =
            (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)
        const numeratorY =
            (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)

        const intersectionX = numeratorX / denominator
        const intersectionY = numeratorY / denominator

        // Check if the intersection point lies within the line segments
        const onSegment = (
            value: number,
            startValue: number,
            endValue: number
        ): boolean => {
            return value >= Math.min(startValue, endValue) && value <= Math.max(startValue, endValue)
        }

        if (
            onSegment(intersectionX, x1, x2) &&
            onSegment(intersectionY, y1, y2) &&
            onSegment(intersectionX, x3, x4) &&
            onSegment(intersectionY, y3, y4)
        )
        {
            return new Vector2(intersectionX, intersectionY)
        }

        return null
    }
}


export default Edge