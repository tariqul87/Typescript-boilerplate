How to run
===

1. Run `npm install`
2. In vscode, type Command + P + > then Execute option "Rub build task"
3. Then everytime change happens, got to debug menu and run "Launch Program"

Run tests to see the problem test case simulation
===
```
npx jest src/tests/FoodDelivery.test.ts
```

# Problem: Food Delivery cost system

## **Phase 1: Basic Cost Calculation**

### **Objective:**

Compute the total delivery cost based on the duration of each delivery and the corresponding driver’s hourly rate.

### **Inputs:**

1. `deliveries`: A list of delivery records:
    - `driver_name` (string)
    - `start_time` (ISO 8601 datetime string)
    - `end_time` (ISO 8601 datetime string)
2. `drivers`: A list of driver registration records:
    - `name` (string)
    - `hourly_rate` (float)

### **Rules:**

- Cost of a delivery is:
    
    ```
    duration_in_hours * hourly_rate
    
    ```
    
- Deliveries may overlap and are paid independently.
- If a driver has not yet registered (i.e., not in the `drivers` list), that delivery **should be logged but not included in the total cost**.
- Once a driver registers via `addDriver(name, hourly_rate)`, you must **retroactively apply the rate** to any of their previously logged deliveries and update the total cost.

---

## **Phase 2: Dynamic Updates**

### **Additional Requirements:**

Implement the following two operations:

1. `addDelivery(driver_name: str, start_time: str, end_time: str)`
    - Logs the delivery.
    - If the driver is already registered, immediately add the cost to the total.
    - Otherwise, store the delivery for later processing.
2. `addDriver(name: str, hourly_rate: float)`
    - Registers the driver and adds them to the system.
    - Retroactively processes any previously logged deliveries by that driver.
    - Updates the total cost accordingly.
3. `getTotalCost() -> float`
    - Returns the current total delivery cost (rounded to two decimal places).

---

### **Example Usage:**

```python
addDelivery("Alice", "2023-01-01T10:00:00", "2023-01-01T11:30:00")  # Alice not registered yet
addDelivery("Bob", "2023-01-01T11:00:00", "2023-01-01T12:00:00")     # Bob not registered yet
getTotalCost()  # Output: 0.00

addDriver("Bob", 12.0)
getTotalCost()  # Output: 12.00

addDriver("Alice", 10.0)
getTotalCost()  # Output: 27.00

addDelivery("Alice", "2023-01-01T12:00:00", "2023-01-01T13:00:00")
getTotalCost()  # Output: 37.00

```

---

## **Phase 3: Driver cost**

Return driver cost using `getDriverCost` by passing the name

## Phase 4: Re-register

If a driver re-register using `addDriver` , we update any incoming cost happening after reregistration with new hourly rate. We don’t update the previous costs

### **Constraints:**

- Time strings are in ISO 8601 format.
- Deliveries can span multiple days.
- `addDriver` and `addDelivery` can be called in any order.
- Assume the system starts with optional drivers and no deliveries.
- You may assume driver names are unique.