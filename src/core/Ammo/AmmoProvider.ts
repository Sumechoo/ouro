import Ammo from 'ammojs-typed';

export class AmmoProvider {
    private static api: typeof Ammo;

    public static async getApi() {
        if (!AmmoProvider.api) {
            AmmoProvider.api = await Ammo();;
        }

        return AmmoProvider.api;
    }

    public static getApiSync() {
        if (!AmmoProvider.api) {
            alert('Api not ready for sync call');
        }

        return AmmoProvider.api;
    }
}