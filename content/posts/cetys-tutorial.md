---
title: Cetys workshop day 1 date: '2021-01-15' published: true layout: post tags: ['node', 'react', 'typescript']
category: example
---

## Fullstack React Graphql Typescript Workshop

### Pre-requisitos

* Postgres esta corriendo en su computadora en el puerto (standard) "
  5432"( [Tutorial](https://www.tutorialspoint.com/postgresql/postgresql_environment.htm) )
* User en Postgres (basicamente poder usar createdb Command)
* Node, NPM, Yarn

### Tecnologias

#### NodeJs

Entorno de tiempo de ejecucion de Javascript.

#### Typescript

Superset[^superset] de javascript para convertir Javascript de tipado dinamico a estatico. (Lo hace mas parecido a Java)

[^superset]: Es decir, un lenguaje que está construído encima del propio Javascript, en el sentido que agrega nuevas
características a Javascript, con herramientas extra para los programadores.

#### React

Librería que permite el desarrollo de GUIs de forma sencilla

#### NextJS

Framework para poder usar `Server Side Rendering` con React. (mejorar SEO y UX)

#### Graphql

Es como SQL (DB) pero para comunicar Client y Server.

#### URQL

Consume Graphql APIs

#### graphql-codegen

Genera automaticamente Interfaces de Typescript con base en Graphql Schemas

#### Apollo-Server

Para exponer la Graphql API al cliente

#### TypeGraphql

Crear Graphql "Schemas" (APIs) usando clases y decoradores.

#### TypeORM

Define y genera Tablas de DBs (Columnas y entidades)

#### PostgreSQL

Base de datos

#### Redis

almacén de datos clave-valor (key-value pairs) en memoria
(validacion de cookies y sesiones)

### Que vamos a construir?

Empezando en el backend, hasta el Frontend desde cero. La idea es crear un clone de [Reddit](https://www.reddit.com/).
Todo me lo estoy robando y traduciendo
del [tutorial Fullstack de Ben Awad](https://www.youtube.com/watch?v=I6ypD7qv3Z8&ab_channel=BenAwad).

La unica diferencia entre ver las 15 horas del video y asistir a este curso es que yo ya hice el tutorial y use las
tecnologias en dos proyectos de la vida real. Por eso hay algunas mejoras. Si se atoran y no contesto, voy a documentar
lo mas importante en esta pagina, o tambien pueden ver el video.

### Estructura del proyecto

Vamos a crear dos repositorios

```react
lireddit
├── lireddit-server # git Repo1 -> !Github!
├── lireddit-client # git Repo2 -> !Github!
```

Que repo usa que tecnologias:

```react
lireddit
├── lireddit-server # Typescript Graphql Nodejs Postgres Redis Typeorm TypeGraphql Apollo-Server
├── lireddit-client # Typescript Graphql React NextJs Urql graphql-codegen
```

TODOs: Crear un diagrama de arquitectura para el proyecto. Como lo harían?

### Configuraciones del servidor

#### Iniciar el servidor con typescript

```bash
node -v
npm -v
yarn -v
mkdir lireddit
cd lireddit
mkdir lireddit-server
cd lireddit-server
npm init -y
yarn add -D @types/node typescript ts-node
npx tsconfig.json # Selecciona "Node"
```

#### Hello world

```bash
touch src/index.ts
```

`index.ts`:

```javascript
console.log('Hello World')
```

#### Crear scripts

`package.json`:

```json5
{
  "scripts": {
    "watch": "tsc -w",
    "start-prod": "node dist/index.js",
    "start-dev": "ts-node src/index.ts"
  }
}
```

```bash
yarn run watch  # Convierte Typescript en Javascript en la carpeta "dist/"
yarn run start-prod  # empieza el servidor node (pure JS)
yarn run start-dev # empieza el servidor typescript
```

#### Hot-reload

"Escuchar" los archivos y reiniciar el servidor automatica-/silenciosamente despues de hacer cambios.

```bash
yarn add -D nodemon
```

```json5
{
  "scripts": {
    "watch": "tsc -w",
    "start-prod": "node dist/index.js",
    "start-dev": "ts-node src/index.ts",
    "start-prod-hot": "nodemon dist/index.js",
    // escucha y recompila de TS a JS despues de cada cambio en dist/
    "start-dev-hot": "nodemon src/index.ts"
    // corre el servidor y reinicialo despues de cada cambio.
  }
}
```

#### Git

Paso 1: Crear un repositorio vacío en Github

```bash
git -v
cd lireddit-server
git init
touch .gitignore
```

Copiar en el `.gitignore`:

```
dist/
.idea/
```

```bash
git add .
git commit -m "Primer commit"
git branch -M develop
git remote add origin https://github.com/nicovegater/lireddit-server.git
```

Para no añadir los archivos generados (`dist/`) ni los archivos de Webstorm (`.idea/`)

### Configuraciones de la Interfaz de Usuario

Para no perder tanto tiempo en css, vamos a usar [Chakra UI](https://chakra-ui.com/).

```bash
cd .. # Para que estemos en `lireddit/`
yarn create next-app --example with-chakra-ui lireddit-client
npm create next-app --example with-chakra-ui lireddit-client
```

Next-app genera automaticamente un repositorio git, entonces solo tenemos que ignorar los archivos que no queremos subir
a Github

```bash
cd lireddit-client
```
Copiar en el `.gitignore`:
```
.idea/
```
Subir archivos a Github
```bash
git add .
git commit -m "Primer commit"
git branch -M develop
git remote add origin https://github.com/nicovegater/lireddit-client.git
git push -u origin develop
```



### Interfaz Base de Datos y servidor

```bash
createdb -p 5432 lireddit
```






