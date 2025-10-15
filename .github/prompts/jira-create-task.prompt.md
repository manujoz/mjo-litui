---
mode: Analyst
description: 'Crea nuevas tareas en Jira usando la herramienta jira'
---

#file:../instructions/jira.instructions.md

# Crea un nuevo issue en Jira

Tu misión es crear un nuevo issue en Jira usando la herramienta `jira`.

## Tipo de tarea

El tipo de tarea puede ser uno de los siguientes: Epic, Feature, Story, Task, Bug. Si el usuario no te indica el tipo de tarea, infiere el tipo de tarea más adecuado según la descripción y el contexto proporcionado por el usuario.

## Summary

El summary debe ser un título breve y conciso que resuma el problema o la feature a implementar, con un máximo de 10-15 palabras.

## Label

Usa la etiqueta `COMPONENTS` para todas las tareas que crees.

## Prioridad

Usa la prioridad que el usuario te indique. Si el usuario no te indica ninguna prioridad, usa `Medium`.

## Epic

Si el usuario te indica un Epic, úsalo. Si no te lo indica busca los epics disponibles e intenta inferir el epic más adecuado para la tarea que vas a crear. Si no puedes inferir ningún epic o tienes dudas, pregúntale al usuario cual asignar.

**IMPORTANTE**: Solo se asignan Epics a Features, Stories, Tasks o Bugs, nunca asignes Epics a Sub-tasks.

### Asignación operativa del Epic

El epic debe ser asignado después de crear el issue, no durante la creación. Si el usuario te indica un Epic, crea el issue sin Epic y luego vincúlalo al Epic indicado usando el enlace de Epic (post-creación).

## Descripción

Debes escribir la descripción del issue como un desarrollador profesional, dando toda la información posible del contexto del proyecto basado en la información que el usuario te ha dado y en el análisis que has hecho del proyecto.

### Organización de la descripción

La descripción debe estar organizada en secciones con títlos H1 y tiene que tener las siguientes secciones:

**Si estás creando una Feature, Story, Task o Sub-Task**:

```markdown
# Details
# Acceptance Criteria
# Technical Notes
# Detail Solution
# How to test
```

**Si estás creando un Bug**:

```markdown
# Details
# Steps to Reproduce
# Expected Result
# Actual Result
# Technical Notes
# Detail Solution
# How to test
```

### Guía para escribir la descripción

**Principios generales**:

- Sé claro y conciso.
- Proporciona **contexto y detalles** de la tarea no solo lo que necesita hacerse.
- Enfócate en el **valor de negocio** y en el **impacto técnico** de la tarea.
- Usa un lenguaje técnico apropiado.
- Estructura la información de manera lógica.
- Manten cada sección **enfocada y relevante**, eveita verborrea innecesaria.

**Instrucciones especificas por sección**:

**Details:**

- Explica **qué** se dener hacer y **por qué** es importante.
- Proporciona contexto del proyecto y del problema.
- Sé claro y directo (normalmente 3-5 frases).
- **Ejemplo**: "El sistema de autenticación actual no soporta OAuth2, lo que limita la integración con servicios externos. Implementar OAuth2 mejorará la seguridad y facilitará la integración con terceros."

**Acceptance Criteria:**

- Enumera **condiciones específicas y comprobables** que definen la finalizción exitosa de la tarea.
- Usa listas desordenadas con resultados claros y medibles.
- Cada criterio debe ser **independiente** y **verificable**.
- Limita a 5-7 criterios, si hay más de 7 hay que crear subtareas.
- **Ejemplo**:
    - "El sistema debe permitir el inicio de sesión usando OAuth2."
    - "Los tokens de acceso deben expirar después de 1 hora."
    - "El sistema debe manejar errores de autenticación correctamente."

**Technical Notes:**

- Proporciona **guía de implementación** solo si tienes contexto claro del proyecto
- Menciona archivos, componentes o patrones relevantes.
- Incluye restricciones técnicas o dependencias.
- Mantenlo a alto nivel (3-5 puntos clave), no es un plan de implementación completo
- Si no estás seguro, escribe `TODO` en vez de adivinar.
- **Ejemplo**:
    - "Usar la librería `passport-oauth2` para manejar la autenticación."
    - "Actualizar el middleware de autenticación en `auth.js`."
    - "Asegurarse de que los tokens se almacenan de forma segura en la base de datos."

**Detail Solution:**

- Escribe siempre `TODO`, esta sección se completará **después** de finalizar la tarea. NUNCA LA RELLENES AL CREAR LA TAREA

**How to test:**

- Proporciona **guía de pruebas a alto nivel**, NO casos de pruebas exhaustivos y detallados.
- Enfócate en **cómo verificar** que la funcionalidad funciona, no en todos los casos límites.
- Se conciso (máximo 5-7 pasos).
- **Ejemplo de buena guia de pruebas**:
    - "Navegar a la página de inicio de sesión."
    - "Hacer clic en el botón 'Iniciar sesión'."
    - "Introducir credenciales válidas."
    - "Verificar que se redirige a la página de inicio."
- **Ejemplo de mala guia de pruebas**:
    - "Probar con diferentes navegadores."
    - "Probar con diferentes tamaños de pantalla."
    - "Probar con diferentes tipos de usuarios."
    - "Probar con diferentes configuraciones de red."
    - "Probar con diferentes estados de la base de datos."
    - "Probar con diferentes versiones del sistema operativo."
    - "Probar con diferentes versiones del navegador."
    - "Probar con diferentes configuraciones de hardware."
    - "Probar con diferentes configuraciones de software."
    - [muchos más casos...] ❌ DEMASIADO DETALLADO
- Si no estás seguro, escribe `TODO` en vez de adivinar.

**Steps to reproduce (Solo para bugs):**

Debe ser proporcionado por el usuario, pregunta si no lo tienes.

**Expected result (Solo para bugs):**

Debe ser proporcionado por el usuario, pregunta si no lo tienes.

**Actual result (Solo para bugs):**

Escribe lo que realmente ocurre según el contexto o el análisis que has hecho del proyecto. Si no tienes contexto suficiente, escribe `TODO`.

### Errores comunes al escribir la descripción

- ❌ Escribir código de implementación o algoritmos detallados.
- ❌ Crear listas exhaustivas de casos de prueba (manten la guia de pruebas a alto nivel).
- ❌ Ser vago o genérico ("arreglar el bug", "hacer que funciones", etc).
- ❌ Explicar en exceso casos obvios o detalles triviales.
- ❌ Incluir información irrelevante o fuera de contexto.

## Cuando crear sub tareas

**¡IMPORTANTE!**: SOLO puedes crear subtareas si el issue que estás creando es una Feature, Story, Task o Bug. Si estás creando "Sub-task" NUNCA crees subtareas, Jira no soporta subtareas de subtareas.

### Crea subtareas cuando:

1. **El usuario te lo solicita explícitamente.**
    - Señal clara de dividir el trabajo.
2. **Hay múltiples dominios técnicos involucrados.**
    - Trabajo de frontend + backend + base de datos.
    - Diferentes servicios o APIs que requieren coordinación.
    - Multiples componentes especializados (ej: servicio de autenticación + servicios de usuarios + servicio de notificaciones).
3. **Los acceptance criterria son demasiado extensos.**
    - Más de 7 criterios.
    - Los criterios representan fases o bloques de trabajo separados.
    - Ejemplo: "Diseñar modelos de datos", "Crear API", "Construir UI", "Agregar tests".
4. **La estimación de la tarea es alta.**
    - Más de 4-5 días.
    - Dividir permite mejor seguimiento y posible paralelización.
    - Facilita identificar bloqueos o dependencias.
5. **Existen dependencias secuenciales claras.**
    - El paso 1 debe completarse antes del paso 2.
6. **Trabajo repetitivo pero independiente.**
    - Ejemplos: "Crear multiples endpoints similares", "Implementar varias páginas con la misma estructura", "Migrar varios componentes a un mismo patrón".

**No crees subtareas cuando:**
- ❌ Estas creando una subtarea (Jira no soporta subtareas de subtareas).
- ❌ La tarea es pequeña y manejable (menos de 3 días).
- ❌ Los acceptance criteria son pocos y claros (menos de 5).
- ❌ La división generaría demasiada sobrecarga administrativa.
- ❌ No hay una razón clara o beneficio para dividir el trabajo.
- ❌ No hay fases técnicas claras para separar.

### Estructurar subtareas

- **Summary**: Específico y accionable (ej: "Crear API de autenticación").
- **Descripción**: Más técnica y concreta que la tarea padre siguiendo los mismos principios y estructura.
- **Estimación individual**: Apropiada para el alcance de la subtarea.
- **Asignación**: Normalmente al mismo desarrollador que la tarea padre, a menos que haya especialización requerida
- **Vinculación**: Siempre vincula la subtarea a la tarea padre correcta en Jira.
- **Mismos campos**: Todos los campos obligatorios deben ser completados (prioridad, labels, etc).

### Flujo de trabajo para crear subtareas

1. **Antes de crear el padre**: Evalua so se cumplen los criterios para subtareas y pregunta al usuario si quiere que las cree.
2. **Si el usuario acepta**: 
    - Crea la tarea padre con **estimacion de 1h**, jira automáticamente sumará las estimaciones de las subtareas.
    - Crea la subtareas con estimaciones individuales.
3. **Si el usuario no acepta**: Crea solo la tarea padre con la estimación completa.

**CRITICAL**: La estimación de la tarea padre debe ser **1h** cuando existene subtareas.

## Estimaciones

**Proceso de estimación**:

1. Analiza la tarea y los cambios necesarios para inferir el tiempo requerido.
2. Si el usuario no proporciona una estimación y no puedes inferirla, pregúntale al usuario.
3. **Determina si se crearán subtareas** sigue instrucciones "Cuando crear sub tareas".
4. Aplica la estimación según corresponda:
    - **Si se crean subtareas**, la tarea padre debe tener una estimación de **1h**, distribuye las estimaciones reales entre las subtareas.
    - **Si no se crean subtareas**, asigna la estimación total a la tarea padre.

## Start date y Due date

Pregunta antes de crear el ticket si el usuario quiere que asignes Start date y/o Due date. Si te dice que sí y te da la fecha de inicio infiere la Due date según la estimación. Ten en cuenta que un día de trabajo son 8 horas.

## Antes de crear un issue

**Paso 1: Determina si se necesitan subtareas**
- Evalua si la tarea cumple los criterios para crear subtareas.
- Si la tarea cumple los criterios, pregunta al usuario si quiere que las cree.
- La decisión del usuario afecta a la estrategia de estimación.

**Paso 2: Muestra un resumen para confirmar**

- Muestra al usuario un resumen de la información con la que crearás el issue, incluyendo:
    - Tipo de tarea (Epic, Feature, Story, Task, Bug, Sub-task)
    - Summary
    - Prioridad
    - Labels
    - Assignee
    - Epic (si aplica)
    - Descripción RESUMIDA (no toda la descripción, solo un resumen muy breve y conciso)
    - Estimación (y desglose si hay subtareas)
    - Start date y Due date (si aplica)
    - Si se van a crear subtareas o no
- Pide confirmación al usuario antes de proceder a crear el issue en Jira.

## Después de crear un issue

Realiza de inmediato, si aplica:

1. Vincular Epic o el parent si aplica
2. Actualizar fechas
    - Start date: `customfield_10015` (YYYY-MM-DD)
    - Due date: `duedate` (YYYY-MM-DD)
3. Actualizar el timetracking con la estimación de lat tarea. **⚠️ IMPORTANT**: `timetracking` MUST go in `fields`, NOT in `additional_fields`.
4. Verificaciones rápidas
   - Validar Priority, Labels (`WEB`), Assignee (Manu Overa), y que el Summary y la descripción sigan la plantilla.

## Una vez terminado

Una vez hasya terminado el trabajo, informa al usuario con un mensaje claro y conciso que incluya:

- El key del issue creado (ej: `MJOLIT-123`)
- Un enlace directo al issue en Jira (ej: `https://manuovera.atlassian.net/browse/MJOLIT-67`)
- Detalles del issue:
    - Tipo de tarea (Epic, Feature, Story, Task, Bug, Sub-task)
    - Summary
    - Prioridad
    - Labels
    - Assignee
    - Epic (si aplica)
    - Descripción RESUMIDA (no toda la descripción, solo un resumen muy breve y conciso)
    - Estimación (y desglose si hay subtareas)
    - Start date y Due date (si aplica)
    - Si se han creado subtareas o no