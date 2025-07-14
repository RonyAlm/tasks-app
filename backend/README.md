---
### ✅ README Backend (`/backend/README.md`)

# Backend - Fullstack Task Manager

Este backend expone una API RESTful para gestionar tareas, utilizando **Node.js**, **Express** y **SQLite**.
---

## Tecnologías Usadas

- Node.js
- Express.js
- Zod
- SQLite (a través de sqlite3)

---

## Instalación

```bash
npm install
```

---

## Ejecución modo desarrollo

```bash
npm run dev
```

---

## Endpoints disponibles

- `GET /tasks`: Obtiene una lista de todas las tareas.
- `GET /tasks/:id`: Obtiene una tarea por su ID.
- `POST /tasks`: Crea una nueva tarea.
- `PUT /tasks/:id`: Actualiza una tarea existente.
- `DELETE /tasks/:id`: Elimina una tarea existente.

### Base de Datos

El backend utiliza una base de datos SQLite para almacenar las tareas. La base de datos se crea automáticamente si no existe y se utiliza para almacenar y recuperar datos.
