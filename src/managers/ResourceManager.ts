import IProgression from "../interfaces/IProgression"
import JsonHelper from "../utilities/JsonHelper"

class ResourceManager
{
    public static GetProgression(): IProgression {
        if (!localStorage.getItem(LocalStorageKeys.progression))
        {
            localStorage.setItem(LocalStorageKeys.progression, '{completedLevels: []}')

        }

        return JsonHelper.Parse<IProgression>(localStorage.getItem(LocalStorageKeys.progression))
    }
}

const LocalStorageKeys = {
    progression: 'progression'
}

export default ResourceManager