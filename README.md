# 📚 API RESTful de Biblioteca Digital (TS + Mongoose)

## 📝 Descripción del Proyecto

Este proyecto consiste en una **API RESTful** diseñada para la gestión de una **Biblioteca Digital**. Permite a los usuarios interactuar con los recursos de la biblioteca, como libros, autores y géneros, a través de solicitudes HTTP (GET, POST, PUT, DELETE).

La API fue desarrollada utilizando el entorno **Node.js** con **Express** y tipado estático con **TypeScript**. La persistencia de datos es manejada por **MongoDB** a través del ODM **Mongoose**.

---

## 🛠️ Tecnologías Clave

| Categoría | Tecnología | Uso Principal |
| :--- | :--- | :--- |
| **Backend** | Node.js / Express | Servidor web y enrutamiento. |
| **Lenguaje** | TypeScript | Tipado estático y compilación. |
| **Base de Datos** | MongoDB | Almacenamiento NoSQL. |
| **ORM/ODM** | Mongoose | Modelado y manejo de datos de MongoDB. |
| **Seguridad** | jsonwebtoken, bcryptjs | Autenticación de usuarios y cifrado de contraseñas. |

---

## 🚀 Guía de Instalación y Ejecución Local

Sigue estos pasos para instalar las dependencias y ejecutar la API en tu máquina local.

### 📋 Requisitos Previos

* **Node.js** (se recomienda la versión LTS)
* **npm** (incluido con Node.js)
* Un servidor de **MongoDB** (local o en la nube).
### ⚙️ Instalación de Dependencias

1.  **Clona el repositorio** (si aún no lo has hecho):

    ```bash
    git clone https://github.com/RodrigoRojas-dev/backend-proyecto-final.git
    cd [NOMBRE_DE_TU_CARPETA]
    ```

2.  **Instala las dependencias** del proyecto:

    ```bash
    npm install
    ```

### ⚙️ Configuración de Entorno

1.  Crea un archivo llamado **`.env`** en la raíz del proyecto.
2.  Define las variables de entorno necesarias, incluyendo la conexión a tu base de datos y el puerto:

    ```
    PORT=3000
    MONGO_URI="mongodb://localhost:27017/nombre_de_tu_db"
    JWT_SECRET="una_clave_secreta_fuerte"
    ```

### ▶️ Ejecución de la API

El proyecto está configurado con dos scripts de ejecución en `package.json`:

#### 1. Modo Desarrollo (`npm run dev`)

Este script usa `ts-node-dev` para iniciar el servidor, lo que permite la **recarga automática** al detectar cambios en los archivos fuente (`.ts`).

```bash
npm run dev
```

#### 2. Modo Producción/Testing (`npm start`)

Este modo ejecuta el código JavaScript compilado en la carpeta `./dist`. Es el que usarías para un entorno de producción.

**Paso Adicional:** Antes de ejecutar `npm start`, debes compilar el código TypeScript a JavaScript:

```bash
npx tsc
```

Luego, inicia el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3000` al iniciarse.

---

## 📑 Endpoints de la API

El enrutamiento principal está dividido en dos áreas: Autenticación y Libros. El prefijo de la ruta base es el puerto configurado (ej: `http://localhost:3000/`).

### 🔐 Rutas de Autenticación (`/auth`)

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Crea un nuevo usuario. |
| `POST` | `/auth/login` | Inicia sesión y devuelve un token JWT. |

### 📖 Rutas de Libros (`/books`)

**Importante:** Todos los endpoints de libros requieren un Token JWT válido enviado en el header `Authorization: Bearer <token>`.

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/books` | Agrega un nuevo libro. |
| `GET` | `/books` | Obtiene una lista de todos los libros. |
| `GET` | `/books/:id` | Obtiene los detalles de un libro específico por su ID. |
| `PATCH` | `/books/:id` | Actualiza un libro por su ID. |
| `DELETE` | `/books/:id` | Elimina un libro por su ID. |
