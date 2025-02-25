import http from "k6/http";
import { sleep, check } from "k6";

const testType = __ENV.TEST_TYPE || "load"; // Set test type via environment variable

const testConfigs = {
  // In this load test I will use a low load of requests to benchmark the system. We can
  // use this benvh mark and compare it with other tests later to see how the performance varries.
  // I will slowly increase the load and then slowly decrese it.
  load: [
    { duration: "5m", target: 100 }, // Normal load
    { duration: "10m", target: 100 }, // Stay in normal load
    { duration: "5m", target: 0 }, // Slowly ramp down to recovery
  ],

  // In this stress test, I will tru different stages of load and
  // see what is the breaking point and how it behaves when I move
  //  to more and more extreem conditions.
  stress: [
    { duration: "2m", target: 100 }, // Normal load
    { duration: "2m", target: 200 }, // Somewhat heavey load
    { duration: "2m", target: 300 }, // heavy load
    { duration: "2m", target: 500 }, // Extreemly heavy load
    { duration: "2m", target: 50 }, // Reduced to a lite load
    { duration: "2m", target: 0 }, // Recovery stage
  ],

  // In this spike test, I will have moderate load for a while then I will jump to
  // extreemly high load in a very short time (a spike). Then I will stay there for
  // a few minute and then rapidly ramp it down.
  spike: [
    { duration: "2m", target: 100 }, // Normal Load
    { duration: "10s", target: 1500 }, // Extreemly high load in a very short time   ***
    { duration: "2m", target: 1500 }, // Continue the load for some time
    { duration: "10s", target: 50 }, // rapidly Reduced to a lite load  ***
    { duration: "2m", target: 50 }, // continue lite load
    { duration: "10s", target: 0 }, // Recovery stage ***
  ],

  // In the soak test I will observe the performance of the API for a longer period
  // of time. This will help us to see how stable the system is, if it runs for
  // prolonged period and if there is any memory leak or performance bottlenecks.
  soak: [
    { duration: "2m", target: 400 }, // Ramp to heavy load
    { duration: "2h", target: 400 }, // Stay in the heavy load for a prolonged time (2 hours)
    { duration: "2m", target: 0 }, // recovery stage
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
