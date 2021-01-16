---
title: Cetys workshop day 1
date: '2021-01-15'
published: true
layout: post
tags: ['tutorials', 'cetys']
category: example
featuredImage: ../assets/ben-awad.png
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

Superset[^superset] de javascript para convertir Javascript de tipado dinámico a estático. (Lo hace mas parecido a Java)

[^superset]: Es decir, un lenguaje que está construido encima del propio Javascript, en el sentido que agrega nuevas características a Javascript, con herramientas extra para los programadores.

#### React

Librería que permite el desarrollo de GUIs de forma sencilla por medio de Componentes.

#### NextJS

Framework para poder usar[^ssr] `Server Side Rendering` con React. (mejorar SEO y UX)

[^ssr]:[porque usar ssr](https://platzi.com/discusiones/1548-react/28115-server-side-renderssr-vs-client-render/?__cf_chl_jschl_tk__=c4206b609596c4c4c3d06a60c0c90e3d9401f562-1610811729-0-AataucO0ZgsOo3srXdF84_rux2odC6TtBrSDgN1QA1IlBFT9UptmCGTgqLGupsF1zAZwRlB_1i32daxavViFka20NaoyyStpZDqougFtWQjZr55mlZvfbPO5-9bBcVhMbRa0jJF0kt1WcZMQfs4FrqDBgMDpoJgHMDuqb3rTQutciYfWCNalgSEST2VGdH1EuajEpFBX2uurr1tXXgCdmdg15s21HJYq0lkcoaIWH9CzdPrToKLXt1wMEkbppVrdox3lDnpQFEDMb2Rrl5OqXd0Ce668pbUy5yNXuaWY-l7PklVOXv6PzwdyV2jb240ClxAUPhDCPnj3HlficWt49hZtYa4lsucUGQD7zbG8Tb-1NYm_VI1fwz90RXvbEerW9CtftS7kd4m-30Eu9ZO7ainhQH13688VPvHt4kzKxUZOGF3XBwm2xwFZj5o2OICvSNriwwZYD0zV82IySOW-rBk)
#### Graphql

Lenguaje para hacer queries. Es como SQL para base de datos, pero para hacer queries entre Cliente y Servidor [^graphql]

[^graphql]: Click [aqui para una explicación](https://medium.com/@jmz12/que-es-graphql-bf835e55960) mas extensa

#### TypeGraphql

Crear Graphql "Schemas" (APIs) es bastante laborioso.
TypeGraphql es una librería que facilita la creación de las APIs que usan Graphql y Typescript.
Por medio de Typescript decorators y clases simples (como las conocen en Java).

#### URQL

Librería para consumir[^consumir] Graphql APIs y manejar Cache en el Browser.

[^consumir]: consumir en el sentido de mandar queries y recibir resultados de esas queries

#### graphql-codegen

Genera automáticamente información sobre una Graphql API.
Dicha información es generada en forma de Interfaces de Typescript. Lo que asegura el tipado estático de la API.

#### Apollo-Server

Para servir la Graphql API al cliente, generar documentación y un Playground.

#### TypeORM

Define y genera Tablas de DBs (Columnas y entidades)

#### PostgreSQL

Base de datos

#### Redis

almacén de datos clave-valor (key-value pairs) en memoria
para validar cookies y sesiones (logins)

### Que vamos a construir?

La idea es crear un clone de [Reddit](https://www.reddit.com/) desde cero.
Alternando entre el servidor-cliente e integrándolos continuamente.
Todo me lo estoy robando y traduciendo
del [tutorial Fullstack de Ben Awad](https://www.youtube.com/watch?v=I6ypD7qv3Z8&ab_channel=BenAwad).

Hay algunas mejoras porque me chute las 15 horas del video
y programe dos proyectos de la vida real usando las mismas tecnologías.

![Ben](../assets/ben-awad.png?)

### Objetivo

Conocer tecnologías relativamente nuevas.
Aplicar estas herramientas en un proyecto de la vida real.

### Nice to have

Cuando terminemos, podemos Dockerizar el proyecto y subirlo a un VPS (e.g. Digital Ocean) para enseñárselo al mundo.

### Estructura del proyecto

Vamos a crear dos repositorios

```react
lireddit
├── lireddit-server # git Repo1 -> !Github!
├── lireddit-client # git Repo2 -> !Github!
```

Que repo usa que librerías:

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

"Escuchar" los archivos y reiniciar el servidor automáticamente después de hacer cambios.

```bash
yarn add -D nodemon
```

```json5
{
  "scripts": {
    "watch": "tsc -w",
    "start-prod": "node dist/index.js",
    "start-dev": "ts-node src/index.ts",
    "start-prod-hot": "nodemon dist/index.js", // escucha y recompila de TS a JS despues de cada cambio
    "start-dev-hot": "nodemon src/index.ts"// corre el servidor y reinicialo despues de cada cambio.
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

Next-app genera automáticamente un repositorio git, entonces solo tenemos que ignorar los archivos que no queremos subir
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

* Limpiar el Index: Return solo <div>Hello world</div>
* Cambiar extensiones a Typescript `.tsx`
  * index.tsx
  * _app.tsx
  * theme.tsx
* Eliminar todos los componentes.
* Instalar typescript y node
```bash
yarn add --dev typescript @types/node
```

* Hello world!
```bash
yarn dev
```

### Interfaz Base de Datos y servidor

```bash
createdb -p 5432 lireddit
```






