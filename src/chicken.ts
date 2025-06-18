export default class Chicken {
    readonly SOUND: string = 'Cluck Cluck';
    constructor() {

    }
    cluck = (): string => {
        console.log(this.SOUND);

        return this.SOUND;
    }
}