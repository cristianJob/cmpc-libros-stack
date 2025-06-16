# cmpc-libros-stack

## Instalacion

- docker compose up --build

Las variables de entorno estan alojadas en el archivo .env de la raiz del proyecto

## Tecnologías Utilizadas

- Nestjs: 11
- Angular: 19
- Node: 20.18.0
- TypeScript: 5.7.2

## Funcionalidades

- Autenticacion de usuario
- Listado de libros con paginacion y filtros
- Ver detalle, creación, actualización y eliminación de un libro
- Formularios con validacion reactiva
- Servicios validados con jwt
- Cerrar sesión

## Arquitectura y Decisiones de Diseño

- **Frontend**: Hecho con Angular y Angular Material. [http://localhost:4200](http://localhost:4200)
- **Backend**: Desarrollado con NestJS (Node.js) y usa TypeORM para manejar la conexión con la base de datos. [http://localhost:3000](http://localhost:3000)
- **Base de datos**: PostgreSQL, alojada en Render y el diseño esta formado por las tablas libro, genero, autor, editorial y usuasio con sus respectivas relaciones
- **Render**: Simplifica el despliegue de base de datos con integración directa desde GitHub.
- **GitHub**: Se usó como repositorio principal
- **Docker**: Para el manejo de contenedores
