import { useEffect, useState } from "react";

// Selecciona la imagen usando Celsius redondeados.
function getWeatherImage(temperatureC) {
  const roundedC = Math.round(temperatureC);

  if (roundedC <= 10) {
    return {
      src: "/cold.png",
      alt: "Cold temperature",
    };
  }

  if (roundedC < 20) {
    return {
      src: "/mild.png",
      alt: "Mild temperature",
    };
  }

  return {
    src: "/sunny.png",
    alt: "Warm temperature",
  };
}

export default function Weather({ latitude, longitude }) {
  const [temperatureC, setTemperatureC] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      setLoading(true);
      setError("");

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        if (!apiKey) {
          throw new Error("Missing weather API key.");
        }

        const url =
          "https://api.openweathermap.org/data/2.5/weather" +
          `?lat=${latitude}&lon=${longitude}` +
          `&appid=${encodeURIComponent(apiKey)}` +
          "&units=metric";

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Could not load weather. Error: ${response.status}`
          );
        }

        const data = await response.json();
        const temperature = data.main?.temp;

        if (!Number.isFinite(temperature)) {
          throw new Error("Invalid temperature received.");
        }

        if (!controller.signal.aborted) {
          setTemperatureC(temperature);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || "Could not load weather.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => controller.abort();
  }, [latitude, longitude]);

  if (loading) {
    return <p role="status">Loading weather...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  const displayedTemperature =
    unit === "C"
      ? Math.round(temperatureC)
      : Math.round(temperatureC * 9 / 5 + 32);

  const image = getWeatherImage(temperatureC);

  function toggleUnit() {
    setUnit((previousUnit) => (
      previousUnit === "C" ? "F" : "C"
    ));
  }

  return (
    <section className="weather" aria-labelledby="weather-title">
      <h3 id="weather-title">Current temperature</h3>

      <img
        src={image.src}
        alt={image.alt}
        className="weather-image"
      />

      <p className="temperature" aria-live="polite">
        {displayedTemperature} °{unit}
      </p>

      <button type="button" onClick={toggleUnit}>
        {unit === "C" ? "Change to °F" : "Change to °C"}
      </button>

      <p>
        Weather data from{" "}
        <a href="https://openweathermap.org/">OpenWeather</a>.
      </p>
    </section>
  );
}