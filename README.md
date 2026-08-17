# Tripleten web_project_api_full

En este proyecto se diseñó un tipo de red social, donde se puede tener distintos usuarios que podrán ver las fotos de los demás así como dar o quiter likes, así mismo cada usuario puede subir fotos y sólo puede eliminar las que le pertenecen. Por otro lado se crearon errores personalizados para avisar a los usuarios cuando exista algún problema al momento de registrar un nuevo usuario o querer iniciar sesión.

## Tecnologías utilizadas para el frontend:

El frontend está elaborado con React que fue creado con Vite, así mismo cuenta con dependencias como react-dom y react-router-dom, está dividido en componentes y cada componente se renderiza de distintas formas dependiendo de diversas variables de estado. También se diseñó para poder recibir respuestas del backend y utilizarlas para un mejor funcionamiento, por ejemplo al momento de iniciar sesión este guarda un token para poder mantener la sesión iniciada al momento de recargar la página o mejor aún incluso al cerrar y volver a abrir el navegador.

### Scripts para el frontend:

"scripts": {
"dev": "vite --open",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview"
}

## Tecnologías utilizadas para el backend:

El backend está hecho con node.js y cuenta con las siguientes dependencias:

- Express: facilita la creación del servidor y la API REST, se utilizó para definir los endpoints y gestionar los middlewares.

- Bcrypt, jsonwebtoken y dotenv: se utilizan para mejorar la seguridad de la información de los usuarios, la primera encripta las contraseñas antes de guardarlas en la base de datos, la segunda se encarga de crear tokens digitales para mantener a los usuarios atenticados y finalmente dotenv cumple la función de poder acceder a la información necesaria para generar los tokens.

- Celebrate y joi: tienen el objetivo de funcionar como un middleware entre el backend y la api para no estar realizando peticiones con información incompleta o incorrecta.

- Cors: se encarga de proteger el origen de donde recibe las solicitudes la api.

- Winston: para tener un registro de todos los errores y peticiones que se hagan dentro de nuestras rutas.

- Mongoose: aquí se crearon los esquemas tanto de usuarios como de las tarjetas, además de esto se utilizan validaciones internas para ayudar a detectar errores y finalmente almacenar nuestra base de datos.

### Ver una pequeña demostración:

[Video demo](https://www.loom.com/share/131f676a5b6d49e98852a91e4654e9d1)

### Prueba el sitio tu mismo:

[Ver sitio web](https://www.ils.heise.cl)
