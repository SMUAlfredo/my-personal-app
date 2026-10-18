import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import weather from "../netlify/functions/weather.mjs";

const originalFetch = globalThis.fetch;
const originalKey = process.env.OPENWEATHER_API_KEY;
const request = () => new Request("http://localhost/.netlify/functions/weather");

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) {
    delete process.env.OPENWEATHER_API_KEY;
  } else {
    process.env.OPENWEATHER_API_KEY = originalKey;
  }
});

test("rejects unsupported methods without consulting OpenWeather", async () => {
  globalThis.fetch = () => { throw new Error("Unexpected fetch"); };
  const response = await weather(new Request(request(), { method: "POST" }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET");
});

test("reports missing configuration without consulting OpenWeather", async () => {
  delete process.env.OPENWEATHER_API_KEY;
  globalThis.fetch = () => { throw new Error("Unexpected fetch"); };
  const response = await weather(request());
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: "Weather service is not configured." });
});

test("requests Guadalajara in Celsius and returns only the temperature", async () => {
  process.env.OPENWEATHER_API_KEY = "test-only-placeholder";
  globalThis.fetch = async (input, options) => {
    const url = new URL(input);
    assert.equal(url.origin, "https://api.openweathermap.org");
    assert.equal(url.pathname, "/data/2.5/weather");
    assert.equal(url.searchParams.get("lat"), "20.6597");
    assert.equal(url.searchParams.get("lon"), "-103.3496");
    assert.equal(url.searchParams.get("units"), "metric");
    assert.equal(url.searchParams.get("appid"), "test-only-placeholder");
    assert.ok(options.signal instanceof AbortSignal);
    return Response.json({ main: { temp: 0 }, extra: "not needed" });
  };
  const response = await weather(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { temperatureC: 0 });
});

test("does not expose the upstream error body", async () => {
  process.env.OPENWEATHER_API_KEY = "test-only-placeholder";
  globalThis.fetch = async () => Response.json({ message: "test-only-placeholder" }, { status: 401 });
  const response = await weather(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "Could not load weather." });
});

test("rejects missing or nonnumeric temperatures", async () => {
  process.env.OPENWEATHER_API_KEY = "test-only-placeholder";
  for (const data of [{}, { main: { temp: null } }, { main: { temp: "23" } }]) {
    globalThis.fetch = async () => Response.json(data);
    const response = await weather(request());
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "Invalid temperature received." });
  }
});

test("does not expose network errors containing credentials", async () => {
  process.env.OPENWEATHER_API_KEY = "test-only-placeholder";
  globalThis.fetch = async () => { throw new Error("URL contained test-only-placeholder"); };
  const response = await weather(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "Could not load weather." });
});
