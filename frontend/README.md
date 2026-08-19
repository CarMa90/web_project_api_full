# Around the World Frontend

> Una interfaz React para descubrir lugares, compartir fotografías y conectar con una comunidad de viajeros.

Cliente web de la aplicación **Around the World**. La interfaz consume la API REST del proyecto para ofrecer una experiencia completa de registro, autenticación, edición de perfil y gestión de tarjetas con fotografías.

[![Aplicación en línea](https://img.shields.io/badge/Aplicación-en%20línea-1f6feb?style=for-the-badge)](https://www.ils.heise.cl)
[![Construido con React](https://img.shields.io/badge/Construido%20con-React-61dafb?style=for-the-badge&logo=react&logoColor=111827)](https://react.dev/)

## Puntos fuertes

- **Navegación protegida:** las rutas privadas solo están disponibles para usuarios autenticados.
- **Sesión persistente:** el token JWT se conserva en el navegador y se valida al volver a cargar la aplicación.
- **Interfaz componentizada:** componentes, contextos y estilos están organizados para facilitar el mantenimiento.
- **Actualización inmediata de la interfaz:** likes, nuevas tarjetas y cambios del perfil se reflejan sin recargar la página.
- **Experiencia responsive:** diseño adaptado a distintos tamaños de pantalla mediante CSS.
- **Flujo de autenticación completo:** registro, inicio de sesión, redirecciones y cierre de sesión.

## Funcionalidades

### Autenticación

- Crear una cuenta.
- Iniciar y cerrar sesión.
- Validar automáticamente la sesión existente.
- Redirigir a la pantalla de inicio de sesión cuando una ruta privada no tiene autorización.

### Perfil y tarjetas

- Ver el perfil del usuario autenticado.
- Editar nombre y descripción.
- Cambiar la fotografía de perfil.
- Crear tarjetas con nombre y enlace de imagen.
- Dar y quitar likes.
- Eliminar tarjetas propias.
- Abrir las fotografías en una vista ampliada.

## Tecnologías

- React 19
- React DOM
- React Router
- Vite
- JavaScript y JSX
- CSS con estilos separados por bloques y componentes

## Estructura del proyecto

```text
src/
├── components/       # Vistas y componentes React
│   ├── Header/        # Encabezado y navegación
│   ├── Login/         # Inicio de sesión
│   ├── Main/          # Perfil, tarjetas y popups
│   ├── Register/      # Registro de usuarios
│   └── ProtectedRoute/ # Control de acceso a las rutas
├── contexts/          # Estado compartido entre componentes
├── utils/             # Peticiones a la API y gestión del token
├── blocks/            # Estilos CSS por sección
├── images/            # Recursos gráficos
└── main.jsx           # Punto de entrada de la aplicación
```

## Instalación y ejecución

### Requisitos

- Node.js 18 o superior
- Backend de Around the World disponible

Instala las dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
```

Vite abre automáticamente la aplicación en `http://localhost:3000`.

## Scripts disponibles

```bash
npm run dev      # Inicia Vite en modo desarrollo
npm run build    # Genera el build de producción
npm run lint     # Ejecuta ESLint
npm run preview  # Sirve localmente el build generado
```

## Configuración de la API

Por defecto, el frontend consume la API desplegada en:

```text
https://api.ils.heise.cl/
```

La URL se define en los archivos `src/utils/api.js` y `src/utils/auth.js`. Para trabajar con un backend local, reemplázala por:

```text
http://localhost:3000/
```

El frontend envía el token en cada solicitud protegida mediante el encabezado:

```http
Authorization: Bearer <jwt>
```

## Flujo de la aplicación

```text
Registro / inicio de sesión
	  ↓
  Token JWT en el navegador
	  ↓
 Validación de la sesión
	  ↓
 Perfil + tarjetas + acciones protegidas
```

## Enlaces

- **Aplicación:** [www.ils.heise.cl](https://www.ils.heise.cl)
- **API:** [api.ils.heise.cl](https://api.ils.heise.cl)
- **Backend:** [web_project_around_express](https://github.com/CarMa90/web_project_around_express)
