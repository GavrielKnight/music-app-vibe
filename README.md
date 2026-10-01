# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Prompt utilizado

En la pantalla de inicio agrega una funcionalidad que permita crear una playlist, asignarle un nombre, agregar canciones existentes en la app, visualizar las playlists creadas, mostrar las canciones que contienen. debe utilizar react native paper.

## Plan propuesto por el agente

Plan: Playlists en Inicio
Agregar creación y consulta de playlists desde Inicio usando React Native Paper. Las playlists conservarán su estado mientras la app esté abierta, sin almacenamiento local. Para consultar las canciones y añadir más, propongo que cada playlist abra una pantalla de detalle.

Pasos

Crear un contexto de playlists fuera de app para mantener el estado al navegar. Guardar el nombre y los IDs de las canciones, usando songs.json como catálogo único.
Montar el provider dentro de PaperProvider en _layout.js, junto al Stack.
Completar la sección “Mis Playlists” en index.js: mostrar las playlists y abrir un diálogo Paper para asignar un nombre y seleccionar canciones. Permitir crear una playlist vacía para agregarle canciones después.
Añadir la ruta src/app/playlists/[id].js para mostrar las cancio