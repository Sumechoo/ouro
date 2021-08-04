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
        return AmmoProvider.api;
    }
}