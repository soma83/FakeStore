# Soma's Store

Este es un proyecto simple de una tienda online, que utiliza el API de FakeStoreAPI. 

## Implementación

Está desarrollado con ReactJS, TypeScript y Tailwind. Usa los íconos gratuitos de FontAwesome
y en su construcción se usó Vite.

## Prerequisitos
* NodeJS previamente instalado. Cualquier versión superior a la 18 debe ser suficiente, 
pero se recomienda usar la 20 o superior.
* Una conexión a internet para poder acceder al API de FakeStoreAPI.

## Montaje

* Clonar el repo.

  `git clone repo`
  
  `cd repo`

* Descargar las dependencias

  `npm i` o `npm install`
  
  o en su lugar si se está usando `yarn` se puede usar `yarn install`.

## Ejecución

Para ejecutar el proyecto se debe estar en el directorio raíz y entrar:

`npm run dev` o `yarn dev` si se está usando `yarn`.

Por defecto el proyecto levantará por el puerto 5173, por lo que se deberá abrir un navegador y 
poner la dirección `http://localhost:5173` y listo.

En el caso de que sea necesario cambiar de puerto se edita el archivo `vite.config.ts`
en la raíz del proyecto y se adiciona la entrada 

```
server: {
    port: xxxx
}
```
donde `xxxx` sería el número del puerto. Por ejemplo:

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000
    }
});
```

Una vez reiniciado el servidor la dirección quedaría `http://localhost:3000`. 

¡Esto es todo!
