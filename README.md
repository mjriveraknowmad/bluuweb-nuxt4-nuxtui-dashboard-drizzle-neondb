# Nuxt4 - NuxtUI - Drizzle ORM - Neon DB - nuxt-auth-utils

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


Créditos: Curso de Vue de Bluuweb https://wwww.udemy.com/course/curso-vue 
- [Objetivo del curso, hacer algo similar a este dashboard oficial de Nuxt UI, y nos basamos muchísimo en este código](https://github.com/nuxt-ui-templates/dashboard) Pero con posibilidad de registro y login real.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Después de modificar el schema.ts

Modificamos el schema (quizás habría que borrar algo en la BBDD) y ejecutamos:
```npx drizzle-kit generate```

Y luego
```npx drizzle-kit migrate```


## Enlaces

- [Objetivo del curso, hacer algo similar a este dashboard oficial de Nuxt UI, y nos basamos mucho en este código](https://github.com/nuxt-ui-templates/dashboard)
- [https://orm.drizzle.team/docs/tutorials/drizzle-with-neon](https://orm.drizzle.team/docs/tutorials/drizzle-with-neon). Aquí están los pasos iniciales seguidos.
- [https://nuxt.com/modules/auth-utils](https://nuxt.com/modules/auth-utils), para rear la sesión del usuario, generando una cookie de sesión cifrada segura que se enviará al cliente, con lo que podemos crear rutas protegidas que solo los usuarios autenticados pueden acceder, verificando la sesión en cada solicitud
- [https://zod.dev/](https://zod.dev/)

- [NuxtUI Components](https://ui.nuxt.com/docs/components/app)
- [NuxtUI Form](https://ui.nuxt.com/docs/components/form)
- [NuxtUI Iconos](https://ui.nuxt.com/docs/getting-started/integrations/icons/nuxt)
- [https://icones.js.org/](https://icones.js.org/)
- [Extensión para ver iconos en VsCode: Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
- [NuxtUI Sidebar](https://ui.nuxt.com/docs/components/dashboard-sidebar#usage)
- [NuxtUI Modal](https://ui.nuxt.com/docs/components/modal)

- [NuxtUI Chat](https://ui.nuxt.com/docs/components/chat#installation) Documentación sobre la instalación y uso de los componentes de chats con IA, usando el SDK de Vercel (En el curso de bluuweb se ve en https://www.udemy.com/course/curso-vue/learn/lecture/53938917)
- [AI SDK de Vercel](https://ai-sdk.dev/docs/ai-sdk-core/generating-text) Documentación usada

