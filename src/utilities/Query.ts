class Query<T>
{
    private array: T[]

    constructor(array: T[]) {
        this.array = array
    }

    public toArray(): T[] {
        return this.array
    }

    public select<E>(predicate: (arg: T) => E): Query<E> {
        const newArray = []
        for (let i = 0; i < this.array.length; i++)
        {
            newArray.push(predicate(this.array[i]))
        }

        return new Query<E>(newArray)
    }
}

function query<T>(array: T[]): Query<T> {
    return new Query<T>(JSON.parse(JSON.stringify(array)) as T[])
}

export default query