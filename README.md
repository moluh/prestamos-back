# API RESTful Para Prestamistas

Instalar Nodemon Global
> npm install -g nodemon

## Generar Script SQL:
> npm run typeorm migration:generate -- src/database/migrations/NombreMigracion -d src/data.source

## Ejecutar Script SQL:
> npm run typeorm migration:run -- -d src/data.source

## Iniciar:
> nodemon exec
   