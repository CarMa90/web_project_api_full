# Around the World API

API REST para una red social de fotografías de lugares del mundo. Este backend administra usuarios y tarjetas, protege las rutas privadas mediante JWT y proporciona las operaciones necesarias para que el frontend gestione perfiles, publicaciones y likes.

## Puntos fuertes

- **Autenticación segura:** las contraseñas se almacenan con `bcryptjs` y el acceso se protege con tokens JWT.
- **Autorización por usuario:** cada tarjeta guarda a su propietario y solo él puede eliminarla.
- **Validación en varias capas:** las solicitudes se validan con `Celebrate` y `Joi`, mientras que los modelos aplican reglas adicionales con Mongoose y `validator`.
- **API organizada:** rutas, controladores, modelos, middlewares y errores están separados por responsabilidad.
- **Manejo consistente de errores:** incluye errores HTTP personalizados para solicitudes inválidas, recursos inexistentes, conflictos, falta de autorización y permisos insuficientes.
- **Observabilidad:** Winston y Express Winston registran las peticiones y los errores del servidor.

## Tecnologías

- Node.js
- Express 5
- MongoDB y Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs`
- `Celebrate` y `Joi`
- `validator`
- `cors` y `dotenv`
- Winston y Express Winston

## Estructura

```text
backend/
├── app.js                 # Configuración y arranque del servidor
├── controllers/           # Lógica de usuarios y tarjetas
├── errors/                # Clases de errores HTTP personalizados
├── middlewares/           # Auth, validaciones y logging
├── models/                # Esquemas y consultas de MongoDB
└── routes/                # Endpoints de usuarios y tarjetas
```

## Requisitos

- Node.js 18 o superior
- MongoDB ejecutándose localmente

La aplicación se conecta por defecto a:

```text
mongodb://localhost:27017/aroundb
```

## Instalación y ejecución

```bash
npm install
npm run dev
```

El modo desarrollo utiliza `nodemon` y el servidor escucha en el puerto `3000` por defecto.

Para iniciar la aplicación sin `nodemon`:

```bash
npm start
```

Comprobar el código con ESLint:

```bash
npm run lint
```

## Variables de entorno

Crea un archivo `.env` en esta carpeta cuando ejecutes el backend en producción:

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=tu_secreto_seguro
```

En desarrollo, la aplicación utiliza `dev-secret` como secreto JWT si `NODE_ENV` no es `production`. Para producción, define siempre un `JWT_SECRET` propio y seguro.

## Endpoints

### Autenticación

| Método | Endpoint  | Descripción                           | Auth |
| ------ | --------- | ------------------------------------- | ---- |
| `POST` | `/signup` | Registra un usuario                   | No   |
| `POST` | `/signin` | Valida credenciales y devuelve un JWT | No   |

### Usuarios

| Método  | Endpoint           | Descripción                               | Auth |
| ------- | ------------------ | ----------------------------------------- | ---- |
| `GET`   | `/users`           | Obtiene la lista de usuarios              | Sí   |
| `GET`   | `/users/me`        | Obtiene el perfil del usuario autenticado | Sí   |
| `GET`   | `/users/:userId`   | Obtiene un usuario por su ID              | Sí   |
| `PATCH` | `/users/me`        | Actualiza nombre y descripción            | Sí   |
| `PATCH` | `/users/me/avatar` | Actualiza el avatar                       | Sí   |

### Tarjetas

| Método   | Endpoint               | Descripción                   | Auth |
| -------- | ---------------------- | ----------------------------- | ---- |
| `GET`    | `/cards`               | Obtiene todas las tarjetas    | Sí   |
| `POST`   | `/cards`               | Crea una tarjeta              | Sí   |
| `DELETE` | `/cards/:cardId`       | Elimina una tarjeta propia    | Sí   |
| `PUT`    | `/cards/:cardId/likes` | Añade el usuario a los likes  | Sí   |
| `DELETE` | `/cards/:cardId/likes` | Quita el usuario de los likes | Sí   |

Las rutas protegidas requieren este encabezado:

```http
Authorization: Bearer <jwt>
```

## Ejemplo de registro

```bash
curl -X POST http://localhost:3000/signup \
	-H "Content-Type: application/json" \
	-d '{"email":"usuario@example.com","password":"ClaveSegura1!"}'
```

La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo.

## Respuestas y errores

La API devuelve los datos principales dentro de la propiedad `data`. Los errores se responden con un objeto `message` y un código HTTP adecuado, por ejemplo:

```json
{
  "message": "Se requiere autorización"
}
```

También existe una ruta `/crash-test` para comprobar el registro de errores del servidor durante el desarrollo.

## Repositorio

[web_project_around_express en GitHub](https://github.com/CarMa90/web_project_around_express)
