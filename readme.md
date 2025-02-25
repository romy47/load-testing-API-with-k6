# Node.js API Performance Testing with k6

This repository contains a **Node.js Express server** and a **k6 performance test script** that evaluates the API using different load testing strategies.

## **Project Structure**

The API directory contains a demo node.js express API
The test-script.js file has all the load testing

## **Prerequisites**

Before running the tests, make sure you have:

- **Node.js** installed
- **k6** installed ([Installation Guide](https://k6.io/docs/getting-started/installation/))

## **Setup and Run Instructions**

### **Step 1: Install Dependencies**

Navigate to the `API` directory and install dependencies:

```sh
cd API
npm install
```

### **Step 2: Start the Express Server**

```
node index.js
By default, the API runs at http://localhost:3000.
```

### **Step 3: Run k6 Tests**

Go to the root directory and execute the test script using k6.

#### 1. Load Test

Simulates a steady increase and decrease in traffic.

```
k6 run --env TEST_TYPE=load test-script.js

```

#### 2. Stress Test

Tests the breaking point of the system with increasing traffic loads.

```
k6 run --env TEST_TYPE=stress test-script.js

```

#### 3. Spike Test

Simulates a sudden traffic surge followed by a rapid decrease.

```
k6 run --env TEST_TYPE=spike test-script.js

```

#### 4. Soak Test

Simulates a long-duration high load to check for memory leaks and performance degradation.

```
k6 run --env TEST_TYPE=soak test-script.js

```
