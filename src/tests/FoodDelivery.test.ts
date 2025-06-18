import { FoodDeliverySystem } from "../FoodDelivery";

describe('Calculates cost properly', () => {
    it('Cost calculation successfull', () => {
        const foodDeliverSystem = new FoodDeliverySystem([
            {name: "Bob", hourlyRate: 12.0},
            {name: "Alice", hourlyRate: 10.0}
        ]);

        expect(foodDeliverSystem.getHourlyRate("Alice")).toBe(10.0);

        foodDeliverSystem.addDeliveryLog(
            "Alice", "2023-01-01T10:00:00", "2023-01-01T11:30:00"
        )
        expect(foodDeliverSystem.getTotalCost()).toBe(15.0)

        foodDeliverSystem.addDeliveryLog(
            "Bob", "2023-01-01T11:00:00", "2023-01-01T12:00:00"
        )
        expect(foodDeliverSystem.getTotalCost()).toBe(27.0)
    })

    it('Cost calculation successfull with late registration', () => {
        const foodDeliverSystem = new FoodDeliverySystem([]);
        foodDeliverSystem.addDeliveryLog(
            "Alice", "2023-01-01T10:00:00", "2023-01-01T11:30:00"
        )

        foodDeliverSystem.addDeliveryLog(
            "Bob", "2023-01-01T11:00:00", "2023-01-01T12:00:00"
        )

        expect(foodDeliverSystem.getTotalCost()).toBe(0.0);

        foodDeliverSystem.addDriver("Alice", 10.0)
        expect(foodDeliverSystem.getTotalCost()).toBe(15.0)

        foodDeliverSystem.addDeliveryLog(
            "Bob", "2023-01-01T11:00:00", "2023-01-01T12:00:00"
        )
        expect(foodDeliverSystem.getTotalCost()).toBe(15.0)

        foodDeliverSystem.addDriver("Bob", 12.0);
        expect(foodDeliverSystem.getTotalCost()).toBe(39.0)
    })
});