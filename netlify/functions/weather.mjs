export default async function weather(request) {
  if (request.method !== "GET") {
    return Response.json(
      { error: "Method not allowed." },
      { status: 405, headers: { Allow: "GET" } }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Weather service is not configured." },
      { status: 500 }
    );
  }

  try {
    // Guadalajara, Jalisco, Mexico. Metric units return Celsius.
    const params = new URLSearchParams({
      lat: "20.6597",
      lon: "-103.3496",
      units: "metric",
      appid: apiKey,
    });
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${params}`,
      { signal: AbortSignal.timeout(10000) }
    );
    if (!response.ok) {
      return Response.json(
        { error: "Could not load weather." },
        { status: 502 }
      );
    }
    const data = await response.json();
    const temperatureC = data.main?.temp;
    if (!Number.isFinite(temperatureC)) {
      return Response.json(
        { error: "Invalid temperature received." },
        { status: 502 }
      );
    }
    return Response.json({ temperatureC });
  } catch {
    // Upstream errors or URLs could contain the API key. Do not return them.
    return Response.json(
      { error: "Could not load weather." },
      { status: 502 }
    );
  }
}
