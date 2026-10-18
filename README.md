# my-personal-app
Small web about myself and my hometown

Aplicacion React con Vite y dos vistas: About Me y My Town.
El clima de Guadalajara se consulta desde una funcion de Netlify.

## Desarrollo local con clima

1. Instala las dependencias con `npm install`.
2. Si no tienes `.env.local`, copia `.env.example` a `.env.local`.
3. Configura `OPENWEATHER_API_KEY` en `.env.local` con tu clave de OpenWeather.
   No uses el prefijo `VITE_` ni subas este archivo a Git.
4. Ejecuta `npx netlify dev` desde esta carpeta. La primera vez puede solicitar
   instalar Netlify CLI.
5. Abre `http://localhost:8888` y selecciona My Town.

`npm run dev` ejecuta solo Vite; utiliza Netlify Dev para probar tambien la funcion.
La funcion esta disponible en `/.netlify/functions/weather` y devuelve
`{ "temperatureC": 23 }` (temperatura de ejemplo).
No acepta coordenadas del navegador: consulta unicamente Guadalajara.

## Despliegue en Netlify

1. Conecta el repositorio a Netlify. Si el repositorio contiene directamente
   `package.json`, deja vacia la carpeta base. Si contiene `my-personal-app`,
   selecciona esa carpeta como base.
2. `netlify.toml` configura el comando `npm run build`, la carpeta publicada
   `dist` y las funciones de `netlify/functions`.
3. En las variables de entorno de Netlify, agrega `OPENWEATHER_API_KEY`
   con tu clave y acceso para Functions en los contextos donde uses el sitio.
   `.env.local` no se sube ni configura automaticamente el sitio publicado.
4. Elimina la antigua variable `VITE_WEATHER_API_KEY` de Netlify si existe.
5. Realiza un nuevo despliegue para aplicar la variable y publicar la funcion.
   Usa la integracion Git o Netlify CLI; subir solo `dist` no publica la funcion.

Si la clave anterior estuvo en un sitio publicado, reemplazala en OpenWeather
porque pudo quedar incluida en el JavaScript de esa version.
La funcion sigue siendo publica, aunque la clave permanece en el servidor.

## Comprobaciones

- `npm run build`: compila la aplicacion.
- `npm run lint`: revisa el codigo.
- `node --test tests/weather.test.mjs`: prueba la funcion sin consultar
  OpenWeather ni utilizar una clave real.
- En el navegador, verifica carga, errores, imagenes y conversion entre C y F.
  La solicitud del clima debe ir a `/.netlify/functions/weather` sin la clave.
