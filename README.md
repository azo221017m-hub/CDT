# CDT - Sistema de Conexión MySQL

Este es un proyecto Next.js que se conecta a una base de datos MySQL en Azure y se puede desplegar en Vercel.

## Características

- ✅ Conexión a MySQL Azure
- ✅ Interfaz web para probar la conexión
- ✅ API REST para verificar el estado de la base de datos
- ✅ Listo para desplegar en Vercel

## Requisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Vercel (para despliegue)

## Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/azo221017m-hub/CDT.git
cd CDT
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Editar `.env.local` con las credenciales de la base de datos MySQL.

4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Importar el repositorio en Vercel: https://vercel.com/new
2. Configurar las variables de entorno en Vercel (usar credenciales reales de Azure):
   - `DB_HOST`: Tu host de MySQL Azure
   - `DB_USER`: Tu usuario de base de datos
   - `DB_PASSWORD`: Tu contraseña segura
   - `DB_NAME`: Tu nombre de base de datos
   - `DB_PORT`: 3306
3. Hacer clic en "Deploy"

### Opción 2: Desde CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Durante el despliegue, configurar las variables de entorno cuando se soliciten.

## API Endpoints

- `GET /api/test-connection` - Prueba la conexión a la base de datos MySQL

## Estructura del Proyecto

```
CDT/
├── lib/
│   └── db.ts                 # Configuración y funciones de base de datos
├── pages/
│   ├── api/
│   │   └── test-connection.ts # API para probar conexión
│   ├── _app.tsx              # Componente principal de la app
│   └── index.tsx             # Página principal
├── styles/
│   ├── globals.css           # Estilos globales
│   └── Home.module.css       # Estilos de la página principal
├── .env.example              # Plantilla de variables de entorno
├── .env.local                # Variables de entorno locales (no commitear)
├── next.config.js            # Configuración de Next.js
├── package.json              # Dependencias del proyecto
├── tsconfig.json             # Configuración de TypeScript
└── vercel.json               # Configuración de Vercel

```

## Tecnologías Utilizadas

- **Next.js 14** - Framework React para producción
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **mysql2** - Cliente MySQL para Node.js
- **Vercel** - Plataforma de despliegue

## Configuración de Base de Datos

El proyecto está configurado para conectarse a MySQL Azure. Configura las siguientes variables de entorno:

- **DB_HOST**: Host de MySQL Azure
- **DB_NAME**: Nombre de la base de datos
- **DB_USER**: Usuario de la base de datos
- **DB_PORT**: Puerto (por defecto 3306)
- **DB_PASSWORD**: Contraseña de acceso
- **SSL**: Habilitado con verificación de certificados

## Licencia

Este proyecto es privado.