import http from "k6/http";
import { sleep, check } from "k6";

const testType = __ENV.TEST_TYPE || "load"; // Set test type via environment variable

const testConfigs = {
  // In this load test, I will use a low number of requests to benchmark the system. We can
  // use this benchmark and compare it with other tests later to see how the performance varies.
  // I will slowly increase the load and then slowly decrease it.
  load: [
    { duration: "5m", target: 100 }, // Normal load
    { duration: "10m", target: 100 }, // Stay in normal load
    { duration: "5m", target: 0 }, // Slowly ramp down to recovery
  ],

  // In this stress test, I will try different stages of load and
  // determine the breaking point and how the system behaves as I move
  // to increasingly extreme conditions.
  stress: [
    { duration: "2m", target: 100 }, // Normal load
    { duration: "2m", target: 200 }, // Somewhat heavey load
    { duration: "2m", target: 300 }, // Heavy load
    { duration: "2m", target: 500 }, // Extremely heavy load
    { duration: "2m", target: 50 }, // Reduced to a lite load
    { duration: "2m", target: 0 }, // Recovery stage
  ],

  // In this spike test, I will maintain a moderate load for a while, then jump to
  // an extremely high load in a very short time (a spike). I will sustain that load
  // for a few minutes and then rapidly ramp it down.
  spike: [
    { duration: "2m", target: 100 }, // Normal Load
    { duration: "10s", target: 1500 }, // Extreemly high load in a very short time   ***
    { duration: "2m", target: 1500 }, // Continue the load for some time
    { duration: "10s", target: 50 }, // Rapidly reduced to a lite load  ***
    { duration: "2m", target: 50 }, // Continue lite load
    { duration: "10s", target: 0 }, // Recovery stage ***
  ],

  // In this soak test, I will observe the API's performance over an extended period.
  // This will help us assess the system's stability when running for a prolonged time
  // and identify any memory leaks or performance bottlenecks.
  soak: [
    { duration: "2m", target: 400 }, // Ramp up to a heavy load
    { duration: "2h", target: 400 }, // Stay in the heavy load for a prolonged time (2 hours)
    { duration: "2m", target: 0 }, // Recovery stage
  ],
};

export let options = {
  stages: testConfigs[testType],
};

export default function () {
  let res = http.get("http://localhost:3000/cats");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
  sleep(1);
}
