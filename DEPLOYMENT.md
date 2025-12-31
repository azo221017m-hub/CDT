# Guía de Despliegue en Vercel

Esta guía contiene los pasos para desplegar la aplicación CDT en Vercel con las credenciales de MySQL Azure.

## Variables de Entorno para Vercel

Al configurar el proyecto en Vercel, agregar las siguientes variables de entorno:

```
DB_HOST=crumenprod01.mysql.database.azure.com
DB_USER=azavala
DB_PASSWORD=Z4vaLA$Ant
DB_NAME=bdcdttx
DB_PORT=3306
```

## Pasos de Despliegue

1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Selecciona el repositorio `azo221017m-hub/CDT`
3. Haz clic en "Configure Project"
4. En la sección "Environment Variables", agrega las variables listadas arriba
5. Haz clic en "Deploy"

## Verificación Post-Despliegue

Una vez desplegado, visita la URL proporcionada por Vercel y verifica:
- La página carga correctamente
- El botón "Probar Conexión" funciona
- Se muestra el estado de la conexión a MySQL

## Notas Importantes

- Las credenciales están protegidas en variables de entorno
- La conexión usa SSL con verificación de certificados
- No commitear el archivo `.env.local` al repositorio
- Este archivo (DEPLOYMENT.md) contiene información sensible y debe mantenerse privado

## Solución de Problemas

Si la conexión falla:
1. Verificar que todas las variables de entorno estén configuradas correctamente
2. Confirmar que el servidor MySQL Azure permite conexiones desde las IPs de Vercel
3. Revisar los logs de la función serverless en el dashboard de Vercel
