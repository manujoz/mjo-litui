---
mode: Jira
description: Completar una tarea de Jira con validación, verificación de worklog y transición de estado apropiada.
---

#file:../instructions/jira.instructions.md

# Completar una tarea de Jira

Tu misión es completar una tarea de Jira usando las herramientas MCP `jira`. Este prompt asegura que se cumplan todos los requisitos antes de marcar una tarea como completada, incluida la validación obligatoria del worklog. Todo el texto en el issue de jira debe estar en inglés.

## Destinos de finalización

Una tarea completada puede moverse a uno de dos estados:

1. **QA** - Para tareas que requieren pruebas de aseguramiento de calidad
2. **Done** - Para tareas que están totalmente completadas y no requieren QA

## Flujo de trabajo

### 1. Obtener la información actual de la tarea

Obtén detalles completos de la tarea incluyendo la información del worklog.

Verificar:

-   Estado actual (debería ser "In progress" o similar)
-   Time tracking: estimación original, tiempo registrado (time spent), estimación restante
-   Estado de subtareas (si las hay)
-   **Criterios de aceptación en la descripción** (extraer y guardar para validación posterior)

### 2. Preguntar al usuario por el estado objetivo

**OBLIGATORIO**: Pregunta al usuario a qué estado quiere mover la tarea:

```
"Where should this task move to?"
1. QA - Requires quality assurance testing
2. Done - Task is fully completed

Please specify: QA or Done
```

Según la respuesta, determina la transición objetivo en Jira MCP, obtiene las transiciones disponibles en Jira y verifica que el objetivo sea válido.

### 3. Validar Worklog (OBLIGATORIO)

**CRÍTICO**: Antes de completar cualquier tarea, DEBES verificar que se haya registrado tiempo de trabajo.

Comprueba el campo `timetracking` de la issue:

-   `timeSpent`: Debe tener un valor (por ejemplo, "1d 4h")
-   `timeSpentSeconds`: Debe ser > 0

**Si NO existe worklog:**

Solicita al usuario:

```
"No work time has been logged for this task. Please register the time in Jira timesheet:"
```

Una vez el usuario indique que lo ha añadido, vuelve a comprobar el worklog y si existe continúa con el flujo.

**Si existe worklog:**

-   Muestra al usuario el tiempo registrado actualmente

### 4. Validar Subtareas (si aplica)

Si la tarea tiene subtareas, revisa su estado.

**Si hay subtareas pendientes**, informa al usuario:

```
"⚠️ This task has {count} pending subtask(s). Do you want to complete the parent task anyway?"
```

Espera la confirmación del usuario antes de proceder.

### 5. Analizar la implementación (OBLIGATORIO)

**CRÍTICO**: Analiza la implementación del código para entender qué se desarrolló.
**CRÍTICO**: Antes de añadir el comentario de finalización, DEBES analizar la implementación para crear un resumen profesional en la sección "Detail Solution".

**Paso 1**: Comprobar la rama Git

La convención de ramas del proyecto es: `feature/[jira-key]` (por ejemplo, `feature/MJOLIT-1234`).

**Paso 2**: Comprobar si existe la rama de la tarea

Usa el terminal para comprobar si la rama existe:

```bash
git branch -a | grep "feature/[jira-key]"
``` 

Si la rama existe:

1. Obtener todos los commits de la rama:
    ```bash
    git log origin/master..feature/[jira-key] --oneline --no-merges
    ```
2. Obtener cambios detallados:
    ```bash
    git diff origin/master...feature/[jira-key] --stat
    ```
3. Revisar mensajes de commit y archivos cambiados
4. Leer los archivos modificados para entender la implementación

Si la rama NO existe Y la tarea es una Subtask:

**IMPORTANTE**: Las subtareas frecuentemente comparten la rama del padre. Comprueba si la tarea es una subtarea y busca la rama del padre.

1. Comprueba si la tarea tiene un padre (buscar el campo `parent` en los datos de la tarea obtenidos en el Paso 1)
2. Si existe el padre (por ejemplo, MJOLIT-1000), busca la rama del padre:
    ```bash
    git branch -a | grep "feature/MJOLIT-1000"
    ```
3. Si la rama del padre existe, úsala para el análisis:
    ```bash
    git log origin/master..feature/MJOLIT-1000 --oneline --no-merges
    git diff origin/master...feature/MJOLIT-1000 --stat
    ```
4. Revisar commits y archivos, filtrando cambios relevantes para esta subtarea

Si ni la rama de la tarea ni la del padre existen:

1. Comprobar si hay cambios sin commitear:
    ```bash
    git status
    ```
2. Si hay cambios detectados, preguntar al usuario: "¿Qué rama contiene la implementación para esta tarea?"
3. Si el usuario proporciona una rama, analizar esa rama
4. Si no hay cambios detectados, pedir al usuario que describa la implementación

**Paso 3**: Analizar la implementación

Basado en commits y cambios de archivos:

1. Identificar archivos cambiados - Listar todos los archivos modificados/creados
2. Entender cambios - Leer los cambios de código reales
3. Categorizar cambios:
    - Frontend
    - Backend
    - Configuración 
    - Documentación
4. Extraer puntos clave:
    - Qué se añadió/modificó
    - Por qué (basado en mensajes de commit y el código)
    - Cómo funciona (enfoque técnico)
    - Puntos de integración (con qué se conecta)

**Paso 4**: Actualizar la descripción de la tarea

Si la descripción de la tarea tiene una sección `Detail solution` (incluso si dice "TODO"):

1. Actualizar esa sección con el resumen profesional
3. Mantener la estructura existente de la descripción

Formato para Detail Solution:

```markdown
# Detail solution

## Implementation Overview
[High-level description of what was implemented]

## Technical Details
- [Key component/feature 1] - [What it does]
- [Key component/feature 2] - [What it does]
- [Configuration/setup changes] - [What changed]

## Architecture Changes
[How the implementation fits into the project architecture]

### Key Files Changed
- **_path/to/key-file1.ts_** - [Brief description of main change]
- **_path/to/key-file2.php_** - [Brief description of main change]
- [X more files in module/feature]

### Integration Points
[What other parts of the system this touches/integrates with]
```

**IMPORTANTE**:

-   Solo listar los archivos más relevantes (3-5 máximo)
-   Agrupar cambios relacionados: "5 Componentes de astro creados", "3 API endpoints", etc.
-   Enfocarse en QUÉ se hizo y POR QUÉ, no en una lista exhaustiva
-   Mantenerlo conciso y profesional

Ejemplo de resumen profesional:

```markdown
# Detail solution

## Implementation Overview
Implemented comprehensive AI assistant integration with four specialized Jira workflow prompts that automate task management and enforce project conventions.

## Technical Details
- Created four custom prompts for task analysis, creation, hold management, and completion
- Integrated MCP Jira tools for automated workflow operations
- Implemented mandatory worklog validation and QA notification system
- Added comprehensive English documentation for team adoption

## Architecture Changes
The solution extends the existing "Efbet mode" chat integration by adding specialized prompts that understand the hybrid Drupal 7 + Lit Element architecture. Each prompt integrates with MCP Jira tools and follows project-specific conventions including custom field handling.

### Key Files Changed
- **_.github/prompts/jira-on-hold.prompt.md_** - Task hold management
- **_.github/prompts/jira-complete-task.prompt.md_** - Task completion with validation
- **_.docs/guides/ai-assistant.md_** - Comprehensive usage guide
- **_2 more prompts and documentation files updated_**

### Integration Points
Integrates with MCP Jira server for task operations, follows specifications for descriptions, and enforces project workflows including worklog validation and QA notifications.
```

### 6. Validar los criterios de aceptación (OBLIGATORIO)

**CRÍTICO**: Cruzar la implementación analizada con los criterios de aceptación.

**Paso 1**: Extraer criterios de aceptación

Desde la descripción de la tarea obtenida en el Paso 1, identifica todos los criterios de aceptación:

- Buscar secciones: "Acceptance Criteria", "AC", "Requirements", "Definition of Done"
- Parsear cada criterio (normalmente listas con viñetas o numeradas)
- Extraer el requerimiento central de cada ítem
- Guardarlos para la validación

**Paso 2**: Cruzar con la implementación

Para cada criterio de aceptación, validar contra la implementación analizada:

1. Asociar criterio con cambios:
    - ¿Qué archivos/commits abordan este requerimiento?
    - ¿La implementación satisface el criterio?
    - ¿Hay evidencia en mensajes de commit?

2. Categorizar cada criterio:
    - ✅ **Met**: Evidencia clara en los cambios
    - ⚠️ **Parcialmente Met**: Evidencia parcial o incompleta
    - ❌ **No Met**: No se encuentra evidencia
    - 🔍 **No se puede validar**: Requiere pruebas en tiempo de ejecución o verificación manual

3. Validación basada en evidencia:
    - Revisar mensajes de commit por palabras clave del criterio
    - Comprobar archivos modificados que lógicamente abordan el requerimiento
    - Considerar implementaciones indirectas
    - Leer secciones de código relevantes si es necesario

**Paso 3**: Reportar la validación al usuario

Si **TODOS** los criterios son ✅ Met:

```markdown
✅ Acceptance Criteria Validation - All Met

All X acceptance criteria have been validated against the implementation.
Proceeding with completion.
```

Si ALGÚN criterio es ⚠️ Parcialmente Met o ❌ No Met:

```markdown
⚠️ Acceptance Criteria Validation

Implementation analysis results:

✅ Met (X/Y):
* [Criterion 1] - Evidence: [file/commit/feature]
* [Criterion 2] - Evidence: [file/commit/feature]

⚠️ Partially Met (X/Y):
* [Criterion 3] - Found: [what exists], Missing: [what's incomplete]

❌ Not Met (X/Y):
* [Criterion 4] - No evidence found in code changes

🔍 Cannot Validate (X/Y):
* [Criterion 5] - Requires [manual testing/runtime verification/clarification]

⚠️ WARNING: Not all acceptance criteria are fully met.

Do you want to proceed with task completion anyway? (yes/no)
```

Esperar la respuesta del usuario.

**Paso 4**: Manejar la respuesta del usuario

- Si la respuesta es yes: Continuar al Paso 7, incluir estado de AC en el comentario de finalización
- Si la respuesta es no: Detener el flujo, sugerir revisar la implementación

Casos especiales:

1. No se encuentran criterios de aceptación:
    - Informar al usuario: "No acceptance criteria found in task description"
    - Preguntar: "Do you want to proceed without AC validation? (yes/no)"

2. No hay cambios de código (solo docs/config):
    - Saltar la validación detallada
    - Informar: "Skipping AC validation - no code changes detected"

3. Todos los criterios son 🔍 No se puede validar:
    - Informar al usuario que todos los criterios requieren verificación manual
    - Proceder sin bloquear (pero documentarlo en el comentario)

Integración con el comentario de finalización:

Cuando haya advertencias o criterios no cumplidos, añadir al comentario de finalización:

```markdown
### Acceptance Criteria Status
_Total Criteria:_ Y
_Fully Met:_ X criteria
_Partially Met:_ X criteria (details in description)
_Not Met:_ X criteria (requires follow-up)
_Cannot Validate:_ X criteria (manual verification needed)

_Note:_ Task completed with user confirmation despite unmet criteria.
```

### 7. Obtener transiciones disponibles

Verifica que conozcas las transiciones disponibles para el estado actual de la tarea; si no, obténlas usando Jira MCP.

Comprueba si la transición objetivo está disponible. Si no lo está, muestra las transiciones disponibles al usuario.

### 8. Añadir comentario de finalización

Añade un comentario de finalización comprensivo con el resumen de la implementación y los resultados de la validación de AC.

**Para la transición a QA:**
(Se mantiene el template en inglés porque las issues deben tener texto en inglés)

```markdown
## Task Completed
*Completed by:* [~accountid:USERID] 
*Completion date:* [Date in YYYY-MM-DD format]
*Time spent:* [Total time from worklog]

### Implementation Summary
[Professional summary from analyzed code - see examples above]

### Acceptance Criteria Status
[Include AC validation results if there were warnings - see 6a for format]

### Testing Notes
[Specific testing instructions based on implementation]

*Status:* Moving to QA`,
```

**Para la transición a Done:**

```markdown
## Task Completed

*Completed by:* [~accountid:USERID]
*Completion date:* [Date in YYYY-MM-DD format]
*Time spent:* [Total time from worklog]

### Implementation Summary
[Professional summary from analyzed code]

### Acceptance Criteria Status
[Include AC validation results if there were warnings - see 6 for format]

All acceptance criteria have been validated. Task is complete.

*Status:* Moving to Done`,
```

**IMPORTANTE**: Reemplazar los placeholders:

- `[~accountid:USERID]` con el account ID real del que completa la tarea
- `[Date in YYYY-MM-DD format]` con la fecha real de finalización
- `[Total time from worklog]` con el tiempo real registrado
- `[Professional summary]` con el análisis real basado en código/commits (NO la descripción del usuario)
- `[Include AC validation results if there were warnings]` con el estado real de AC del Paso 6 (omitir la sección si todos los criterios están cumplidos)

### 9. Hacer la transición al estado objetivo

Finalmente, realiza la transición usando el transition ID apropiado (obtenlo de Jira MCP si no lo tienes).

Usar `mcp_jira_jira_transition_issue` con:

- `issue_key`: clave de la tarea (ej. "MJOLIT-XXXX")
- `transition_id`: ID de la transición para QA o Done

**No añadir comentario en la transición** (ya se añadió en el paso anterior).

## Checklist de validación

Antes de la transición, verificar:

- ✅ **Task info fetched** (con criterios de aceptación extraídos)
- ✅ **Target state determined** (QA o Done - preguntar al usuario)
- ✅ **Worklog exists** (OBLIGATORIO - bloquear si falta)
- ✅ **Subtasks checked** (advertir si hay pendientes)
- ✅ **Implementation analyzed** (OBLIGATORIO - commits/cambios revisados)
- ✅ **Acceptance criteria validated** (OBLIGATORIO - cruzado con código)
- ✅ **Detail Solution updated** (en la descripción si existe la sección)
- ✅ **Transition available** (verificar antes de intentar)
- ✅ **Comment prepared** (con estado de AC si aplica, mención de QA si aplica)
- ✅ **User confirmation** (mostrar resumen antes y luego ejecutar)

## Manejo de errores

1. **No worklog**:
    - BLOQUEAR la finalización
    - Pedir al usuario que añada tiempo en Jira timesheet
    - Verificar worklog antes de continuar

2. **Branch not found**:
    - Comprobar `git status` para cambios sin commitear
    - Si hay cambios, preguntar: "Which branch contains the implementation?"
    - Si no, pedir al usuario que describa la implementación

3. **Pending subtasks**:
    - Advertir al usuario
    - Pedir confirmación
    - Proceder solo si confirma

4. **Transition not available**:
    - Mostrar estado actual
    - Listar transiciones disponibles
    - Sugerir el flujo correcto

5. **Already in target state**:
    - Informar que la tarea ya está en QA/Done
    - Preguntar si desea actualizar el comentario

6. **Permission denied**:
    - Informar que no tienes permisos
    - Sugerir contactar al admin del proyecto

7. **Cannot update Detail Solution**:
    - Si la descripción no tiene la sección, añadir el resumen solo en el comentario de finalización
    - Informar que no se encontró la sección Detail Solution

8. **Acceptance criteria not met**:
    - Mostrar informe detallado con evidencia
    - Pedir confirmación explícita del usuario
    - Incluir estado de AC en el comentario de finalización

9. **No acceptance criteria found**:
    - Informar que no se encontraron criterios en la descripción
    - Preguntar si desean proceder sin validación
    - Documentarlo en el comentario si se procede

## Antes de ejecutar

Mostrar resumen comprensivo al usuario:

```
📋 Task Completion Summary

Task: MJOLIT-XXXX - [Summary]
Current Status: [Current]
Target Status: [QA/Done]

✅ Worklog: [X hours logged]
✅ Subtasks: [None / All complete / X pending]
✅ Acceptance Criteria: [All met / X unmet - user confirmed]
✅ Comment: Will be added with [AC status / QA mention / completion note]

Proceed with completion? (yes/no)
```

Nota: Resumir lo que se incluirá en el comentario (estado de AC, mención de QA, etc.)

Esperar confirmación del usuario.



## Después de la ejecución

Proveer reporte detallado de finalización:

```
✅ Task Completed Successfully

Task: MJOLIT-XXXX - [Summary]
Link: [Jira URL]

Status: [Previous] → [QA/Done]
Time Logged: [Total time]
Comment: Added with [details]

[If QA: "✅ Cevza Beliz has been notified"]
[If Done: "✅ Task is fully complete"]

Next steps: [If any]
```

**Jira URL**: El formato es `https://manuovera.atlassian.net/browse/[issue-key]`  
**Comment**: Resumir qué se incluyó en el comentario (estado de AC, mención de QA, etc.)

---

## Buenas prácticas

1. **Always validate worklog first** - Esto es innegociable; el usuario debe registrar tiempo en Jira timesheet
2. **Analyze implementation thoroughly** - Revisar commits y cambios para entender lo hecho
3. **Validate acceptance criteria** - Cruzar implementación con AC y proveer evidencia
4. **Create professional summaries** - Basarse en código real, no en suposiciones
5. **Update Detail Solution** - Si la sección existe, actualizarla con detalles técnicos
6. **Get user input for target state** - No asumir QA o Done
7. **Provide context in comments** - Ayudar a QA/equipo a entender implementación y estado de AC
8. **Verify subtasks** - Evitar completar padres prematuramente
9. **Mention QA when appropriate** - Usar `[~c.nalincioglu.ext]` para Cevza Beliz
10. **Show summaries** - Mantener al usuario informado antes y después
11. **Handle errors gracefully** - Dar pasos claros para resolver
12. **Document unmet criteria** - Siempre incluir estado de AC en el comentario si hay advertencias

## Escenarios comunes

### Escenario 1: Dev completa feature, necesita QA

```
User: "Complete MJOLIT-1234"
AI: "Where should this move: QA or Done?"
User: "QA"
AI: [Validates worklog]
AI: [Checks for branch feature/MJOLIT-1234]
AI: [Analyzes commits and code changes]
AI: [Validates all acceptance criteria - all met]
AI: [Creates professional summary from code]
AI: [Updates Detail Solution in task description]
AI: [Adds comment with AC status]
AI: [Transitions to QA]
```

### Escenario 2: Actualización de documentación, no requiere QA

```
User: "Mark MJOLIT-5678 as done"
AI: [Validates worklog - none found]
AI: "No worklog. Please add time in Jira timesheet"
User: "Added"
AI: [Verifies worklog exists]
AI: [Analyzes git changes - docs files modified]
AI: [Skips AC validation - no code changes]
AI: [Creates summary of documentation changes]
AI: [Adds comment]
AI: [Transitions to Done]
```

### Escenario 3: Tarea tiene subtareas pendientes

```
User: "Complete MJOLIT-9999"
AI: [Checks subtasks - 2 pending]
AI: "⚠️ 2 subtasks are not done. Complete parent anyway?"
User: "Yes"
AI: [Analyzes implementation]
AI: [Validates AC - 1 criterion not met due to pending subtask]
AI: "⚠️ 1 AC not met. Proceed anyway?"
User: "Yes"
AI: [Proceeds with completion, documents AC status]
```

### Escenario 4: Branch no encontrada pero hay cambios

```
User: "Complete MJOLIT-7777 to QA"
AI: [Checks for feature/MJOLIT-7777 - not found]
AI: [Checks git status - modified files detected]
AI: "Which branch contains the implementation for this task?"
User: "feature/new-authentication"
AI: [Analyzes that branch]
AI: [Creates professional summary]
AI: [Proceeds with completion]
```

### Escenario 5: No branch, no cambios sin commitear

```
User: "Complete MJOLIT-8888"
AI: [Checks for branch - not found]
AI: [Checks git status - no changes]
AI: "No code changes detected. Can you describe the implementation?"
User: "Updated Jira workflow configuration manually"
AI: [Uses user description for summary]
AI: [Proceeds with completion]
```

