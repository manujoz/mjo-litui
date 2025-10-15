---
mode: Documenter
description: Este prompt es utilizado para actualizar y mantener documentación técnica de componentes clara y concisa.
---

#file:../instructions/documentation.instructions.md

Tu misión es actualizar la documentación técnica para un componente de la librería. Esta documentación debe ser clara, concisa y seguir las mejores prácticas de documentación técnica. La documentación será usada por desarrolladores con experiencias, por lo que debe ser precisa pero no contener verborrea innecesaria.

# 1. Localización de la documentación

Tienes que buscar la documentación en `docs/[nombre-componente].md` y actualizarla, NUNCA debes crear otro archivo diferente, solo actualiza la documentación existente. 

**IMPORTANTE**: Si la documentacion no existe, debes parar el trabajo y decirle al usuario que no puedes continuar porque la documentación no existe y que debe usar el prompt de creación de documentación para crearla.

# 2. Análisis del componente

Analiza el componente en **PRONFUNDIDAD** para entender su propósito, funcionalidad, propiedades, estados, métodos públicos, eventos, variables CSS y CSS parts. También debes identificar si el componente tiene algún componente dependiente que solo se usa con este componente para tenerlo en cuenta para la documentación. No es aplicable para otros componentes comunes, por ejemplo un componente que usa el `mjo-button` o el `mjo-dropdown`.

**CRITICO**: No puedes dejarte nada, debes ser exhaustivo analizando el componente y sus componentes dependientes, memorizar toda la información relevante para la documentación. Dedica todo el tiempo necesario para entender el componente a fondo.

**CRITICO**: Busca el archivo de tipos del componente `.d.ts` para obtener los tipos del componente. Si el componente no tiene un archivo de tipos está incompleto y no puedes crear la documentación, debes pedir al usuario que cree el archivo de tipos antes de crear la documentación.

# 3. Estructura de la documentación

La documentación debe seguir **estrictamente** la siguiente estructura:

1. **Título del componente**: El nombre del componente como título principal, por ejemplo `mjo-button`.
2. **Descripción breve**: Una breve descripción del propósito y funcionalidad del componente.
3. **Indice**: Un índice con enlaces a las secciones principales del propio archivo de documentación, SOLO UN NIVEL NO AÑADAS SUBSECCIONES.
4. **Casos de uso**: Descripción de los casos de uso más comunes del componente.
5. **Importación**: Instrucciones sobre cómo importar el componente en un proyecto. (ej. `import 'mjo-litui/mjo-button';`);
6. **Propiedades**: Tabla con las propiedades del componente, incluyendo:
   - Nombre de la propiedad
   - Tipo
   - Descripción
   - Valor por defecto
   - Obligatoria (sí/no)
7. **Estados**: Estados públicos `@state` de componente deben ser documentados en una tabla similar a las propiedades. **IMPORTANTE**: No documentes estados privados (por ejemplo `private open`).
8. **Métodos públicos**: Tabla con los métodos públicos del componente, incluyendo:
   - Nombre del método
   - Parámetros (si los hay)
   - Descripción
   - Valor de retorno (si lo hay)
9. **Eventos**: Tabla con los eventos emitidos por el componente, incluyendo:
   - Nombre del evento
   - Descripción
   - Tipo del evento (Normalmente puedes encontrarlo en el archivo de tipos `.d.ts` del componente).
   - Parámetros (si los hay)
10. **Variables CSS**: Si el componente tiene variables CSS específicas deben ser documentadas. Estas variables deben seguir el siguiente patrón `--mjo-[componente]-[propiedad]`, por ejemplo `--mjo-button-background-color`. También deben documentarse las variables CSS en los componentes dependientes si hubiera componentes dependientes exclusivos para el componente principal y sigan el mismo patrón del componente principal o el patrón `--mjo-[componente]-[dependiente]-[propiedad]`. **NUNCA** documentes variables que no siguen este patrón para el componente específico. La tabla debe incluir:
   - Nombre de la variable
   - Descripción
   - Valor por defecto (si no lo hay `-`)
11. **CSS Parts**: Si el componente tiene CSS parts deben ser documentadas, **INCLUYENDO** las `exportparts` de los componentes dentro del mismo. La tabla debe incluir:
    - Nombre del CSS part
    - Descripción
    - Elemento afectado (si no lo hay `-`)
12. **Accesibilidad**: Describe las características de accesibilidad del componente:
   - Mejores prácticas para el uso del componente.
   - ARIA roles y atributos (si aplica).
   - Keyboard interactions (si aplica).
13. **Ejemplos de uso**: Proporciona ejemplos de uso del componente en diferentes escenarios. Incluye fragmentos de código que muestren cómo usar el componente con diferentes propiedades y en diferentes estados. **IMPORTANTE**: No incluyas ejemplos obvios o que no aporten valor adicional. Incluye:
   - Ejemplos de uso que no sean obvios.
   - Ejemplos de manejo programático que no sean obvios (si aplica).
   - Ejemplos de integración en formularios si aplica.
   - Ejemplos de manejos de eventos (si aplica).
   - Ejemplos de uso de CSS parts y variables CSS (si aplica).
14. **Notas adicionales**: Cualquier otra información relevante sobre el componente que no haya sido cubierta en las secciones anteriores.

# 4. Formato y estilo

- Usa un lenguaje claro y conciso y con tono profesional.
- Usa listas y tablas para organizar la información.
- Usa bloques de código para ejemplos y fragmentos de código en un formato correcto y consistente.

# 5. JsDocs

Si el componente no tiene JsDocs o están incompletos o desactualizados, añade o actualiza los JsDocs en el código del componente siguiendo las mejores prácticas de JsDocs.

**JsDocs de la clase del componente**: Debe incluir ESTRICTAMENTE esta información:

- `@summary`: Una breve descripción del propósito y funcionalidad del componente.
- `@slots`: Si el componente usa slots, deben ser documentados aquí SI NO LO TIENE NO PONGAS ESTE DATO.
- `@fires`: Si el componente emite eventos, deben ser documentados aquí SI NO LO TIENE NO PONGAS ESTE DATO.
- `@csspart`: Si el componente tiene CSS parts, deben ser documentados aquí SI NO LO TIENE NO PONGAS ESTE DATO.
- `@cssprop`: Si el componente tiene variables CSS que cumplen las condiciones, deben ser documentados aquí SI NO LO TIENE NO PONGAS ESTE DATO.

**JsDocs para métodos públicos**: Cada método público debe tener un JsDoc que incluya la descripción del método, no incluyas ejemplos, parámetros y valor de retorno si los hay ya que estos se infieren gracias a typescript.

**CRITICO**: Nunca añadas JsDocs a propiedades, estados o métodos privados, añadelos EXCLUSIVAMENTE a lo que se te ha pedido expresamente.

# 6. Actualiza referencias e índices

- Actualiza el archivo `docs/README.md` para incluir un enlace a la nueva documentación del componente.
- Si hay índices o tablas de contenido en otros archivos, asegúrate de que estén actualizados con la nueva documentación.
- Verifica todos los links dentro de `docs/` para asegurarte de que todos los enlaces internos y externos funcionen correctamente.