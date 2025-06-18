export default class Chicken {
    readonly SOUND: string = 'Cluck Cluck';
    constructor() {

    }
    getSound = (): string => {
        console.log(this.SOUND);

        return this.SOUND;
    }
}