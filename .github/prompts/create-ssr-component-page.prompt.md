---
mode: agent
model: Claude Sonnet 4
---
Hay que crear una nueva página de ejemplo en el servidor ssr (`server`) para el componente ${input:component}.

Tu misión es:

- Analizar en prfundidad todas las funcionalidades y propiedes del componente ${input:component} 
- Crear el controlador para la págna, analiza con detenimiento `server/src/controllers/avatar-controller.ts` y `server/src/controllers/chip-controller.ts` para seguirlos de ejemplo para crear el nuevo controlador `${input:newControllerName}`. Tienes que seguir el mismo flujo y estilo de código obigatoriamente que en los controladores de ejemplo. Si tienes que crear clases CSS nuevas tendrás que hacerlo en `server/public/css` en un archivo nuevo para el componente.
- Crear el archivo de interacción para el `playground-showcase`, analiza en profundidad y toma de ejemplo `server/client/avatar-interactions.ts` y `server/client/chip-interactions.ts`. Tienes que seguir el mismo patro de desarrollo que en los ejemplo.
- Añadir la ruta a `server/src/utils/routes.ts` con el nuevo controlador.
- Añadir la importación del componente para el servidor en `server/src/services/ssr-renderer.ts`
- Añadir la importación del componente para el cliente en `server/client/client.ts`

Si tienes alguna duda, consultame antes de implementar.