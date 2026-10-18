# About Me & My Town

**Live website:** [https://alfredochidoapp.netlify.app/](https://alfredochidoapp.netlify.app/)

An academic project built with React and JavaScript. It includes a personal introduction and a view about Guadalajara, Jalisco, Mexico, my hometown.

## Features

- **About Me:** a personal introduction, a photograph, and hobbies.
- **My Town:** a photograph of Guadalajara, a description, and recommended activities.
- Current temperature data from OpenWeather.
- A button to switch between Celsius and Fahrenheit.
- Images and colors that change based on the temperature.
- Loading and error messages during weather requests.

## Technologies

React, JSX, JavaScript, and CSS for the interface; Vite for development and builds; OpenWeather for weather data; and Netlify Functions for server-side requests.

## Project Structure

| File or folder | Purpose |
| --- | --- |
| `src/App.jsx` | About Me and My Town views and navigation buttons. |
| `src/App.css` | Layout, colors, and styling. |
| `src/Weather.jsx` | Requests to the function, temperature, units, and loading and error states. |
| `src/main.jsx` | React entry point. |
| `public/` | Photographs and weather images. |
| `netlify/functions/weather.mjs` | Server-side requests to OpenWeather. |
| `tests/weather.test.mjs` | Function tests using simulated responses. |
| `netlify.toml` | Build, functions, and local development configuration. |
| `.env.example` | Required environment variable name, without an API key. |

## How It Works

Navigation uses `useState` to display one of the two views. When `Weather` is displayed, `useEffect` starts the weather request. The component stores the temperature, selected unit, and loading and error states.

```text
Weather.jsx -> /.netlify/functions/weather -> OpenWeather
```

The function only queries Guadalajara's coordinates and requests the temperature in Celsius. It reads the API key from `OPENWEATHER_API_KEY` and returns only the temperature, for example:

```json
{ "temperatureC": 23 }
```

The browser converts this value to Fahrenheit when the button is clicked, without making another request. The function handles errors without returning the API key or the URL containing it.

## Local Development

You need Node.js, npm, and an OpenWeather API key to retrieve weather data.

1. Open a terminal inside `my-personal-app` and install the dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env.local` and assign your API key to `OPENWEATHER_API_KEY`. The example file leaves the value empty:

   ```dotenv
   OPENWEATHER_API_KEY=
   ```

3. Start the application and functions:

   ```sh
   npx netlify dev
   ```

   The first run may ask you to install Netlify CLI.

4. Open `http://localhost:8888` and select My Town.

On Windows, if PowerShell blocks `npm.ps1` or `npx.ps1`, use `npm.cmd` and `npx.cmd` in the same commands.

`npm run dev` starts only Vite. Use Netlify Dev to test the weather function as well.

## Environment Variables

`OPENWEATHER_API_KEY` contains the API key used by the server-side function. `.env.local` is excluded from Git. Do not write the key in components, the README, or `netlify.toml`.

The variable does not use the `VITE_` prefix because variables with that prefix used by the frontend are included in the code sent to the browser. The function is public, but the key stays on the server. If a key was exposed in a previously published version, replace it in OpenWeather.

## Deploying to Netlify

1. Save your changes and push them to GitHub without including `.env.local`.
2. In Netlify, select **Add new project > Import an existing project** and connect the repository.
3. If `package.json` is at the repository root, leave the base directory empty. If it is inside `my-personal-app`, select that folder as the base directory.
4. Check the settings in `netlify.toml`:

   | Setting | Value |
   | --- | --- |
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Functions directory | `netlify/functions` |

5. Add `OPENWEATHER_API_KEY` to Netlify's environment variables with your API key. Include Functions access and the Production context if those options are available.
6. Remove `VITE_WEATHER_API_KEY` from Netlify if it still exists.
7. Start a new deployment and check the weather in My Town.

`.env.local` only configures the local environment; the variable must also be added in Netlify. Deploy through Git integration or Netlify CLI. Uploading only `dist` does not deploy the function.

## Checks

```sh
npm run build
npm run lint
node --test tests/weather.test.mjs
```

These commands build the application, check the code, and run the function tests. The tests use simulated responses to verify temperature handling and error handling without contacting OpenWeather or using a real API key.

For manual testing, check navigation, images, loading and error messages, and the unit button. In the browser's Network tab, the request should go to `/.netlify/functions/weather` without including the API key.

## AI Use and Learning Process

JavaScript and React are new to me. During this assignment, I used AI to guide me, explain concepts, and teach me how to use these technologies. I worked alongside the tool, developing my project while asking questions and reviewing explanations to understand how the code works.

I created the CSS design and wrote the JSX code for the views and components. AI helped me review and adjust parts of the code. It also assisted with implementing the move of the weather request to a Netlify function and preparing its tests. This support was part of my learning process.

I also used AI to organize and polish this README because I am still learning how to document my projects and find it difficult to explain technical details clearly.

## Credits

Weather data is provided by [OpenWeather](https://openweathermap.org/).
