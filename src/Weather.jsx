import { useEffect, useState } from "react";


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

export default function Weather() {
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
        const response = await fetch("/.netlify/functions/weather", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Could not load weather. Error: ${response.status}`
          );
        }

        const data = await response.json();
        const temperature = data.temperatureC;

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
  }, []);

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
  const roundedC = Math.round(temperatureC);

  let weatherClass = "warm";

  if (roundedC <= 10) {
    weatherClass = "cold";
  } else if (roundedC < 20) {
    weatherClass = "mild";
  }

  function toggleUnit() {
    setUnit((previousUnit) => (
      previousUnit === "C" ? "F" : "C"
    ));
  }

  return (
    <section className={`weather ${weatherClass}`} aria-labelledby="weather-title">
      <h3 id="weather-title">Current temperature</h3>

      <img
        src={image.src}
        alt={image.alt}
        className="weather-image"
      />

      <p className="temperature" aria-live="polite">
        {displayedTemperature} °{unit}
      </p>

      <div className="weather-buttons">
        <button type="button" onClick={toggleUnit}>
          {unit === "C" ? "°F" : " °C"}
        </button>
      </div>

      <p>
        Weather data from{" "}
        <a href="https://openweathermap.org/">OpenWeather</a>.
      </p>
    </section>
  );
}