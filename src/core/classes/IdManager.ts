export class IdManager {
    static id = 0;

    public static getNewId() {
        return ++IdManager.id;
    }
}