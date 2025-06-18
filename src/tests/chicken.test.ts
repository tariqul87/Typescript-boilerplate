import Chicken from "../chicken"

describe('Verify chicken sound', () => {
    it('Chicken goes cluck cluck', () => {
        const chicken = new Chicken();

        expect(chicken.getSound()).toBe('Cluck Cluck')
    })
})