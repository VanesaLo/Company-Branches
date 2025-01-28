This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Proyecto: Presentación de Sucursales

Descripción

Esta es una página web diseñada para una empresa que desea presentar sus sucursales al público. La aplicación cuenta con:

**Vista pública:** Donde se muestra información de las sucursales disponibles.

**Panel de administración:** Permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) para gestionar las sucursales.

Además, las sucursales incluyen información detallada como país, departamento y ciudad, con opciones de búsqueda optimizada en los selectores para facilitar la navegación.

## Tecnologías utilizadas

- Next.js 15 [Next.js](https://nextjs.org)
- React.js 19
- Shadcn

### Requisitos previo
 1. Node.js [Descargar](https://nodejs.org/es)
 2. Git (para clonar el repositorio)

## Instrucciones de instalación y ejecución

1. Clonar el repositorio

```bash

git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_REPOSITORIO>

```

2. Instalar dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configurar variables de entorno

Crea un archivo .env.local en la raíz del proyecto y configura las siguientes variables:

```bash

NODE_ENV="development"
BASE_URL="http://localhost:3000"
SERVER_PRUEBATEST_URL=""
SERVER_URL_STORAGE=""
AUTH_SECRET=""
AUTH_URL=""

```

4. Iniciar el servidor de desarrollo

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
