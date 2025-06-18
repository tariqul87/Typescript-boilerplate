export class FoodDeliverySystem {
    readonly MILISECONDS_IN_HOUR = 60 * 60 * 1000;
    drivers: Map<string, DriverType>;
    deliveryLogs: DeliveryLogType[];
    totalCost: number;
    constructor(drivers: DriverType[]) {
        this.drivers = new Map();
        this.deliveryLogs = new Array(0);

        for (const diver of drivers) {
            this.addDriver(diver.name, diver.hourlyRate)
        }

        this.totalCost = 0;
    }
    addDriver = (name: string, hourlyRate: number): void => {
        const driver = {name, hourlyRate};
        this.drivers.set(name, driver);

        this.deliveryLogs.forEach((log) => {
            if (log.name === driver.name) {
                this.updateCost(driver, log.startTime, log.endTime)
            }
        })
    }
    getHourlyRate = (name: string): number => {
        const driver = this.drivers.get(name);

        if (!driver) {
            throw new Error('Driver not found');
        }

        return driver.hourlyRate;
    }
    addDeliveryLog = (name: string, startTimeString: string, endTimeString: string): void => {
        // Record to log
        const startTime = new Date(startTimeString).getTime();
        const endTime = new Date(endTimeString).getTime();
        const log = {
            name,
            startTime,
            endTime
        }
        this.deliveryLogs.push(log);

        // Update total cost
        const driver = this.drivers.get(name);

        if (!driver) {
            // Can't update driver, so will skip for now. No update to cost is done
            return;
        }

        this.updateCost(driver, startTime, endTime)
    }
    updateCost = (driver: DriverType, startTime: number, endTime: number) => {
        const timeWorked = Math.abs(endTime - startTime) / this.MILISECONDS_IN_HOUR;
        const cost = driver.hourlyRate * timeWorked;
        this.totalCost += cost;
    }
    getTotalCost = (): number => {
        return this.totalCost;
    }
}

export type DriverType = {
    name: string,
    hourlyRate: number,
}

export type DeliveryLogType = {
    name: string,
    startTime: number,
    endTime: number
}