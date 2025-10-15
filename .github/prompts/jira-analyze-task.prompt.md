---
mode: Architect
description: Analiza una tarea de Jira y crea un plan de implementación detallado.
---

#file:../instructions/jira.instructions.md


# Analizar una tarea de Jira

Tu misión es leer una tarea de Jira usando el MCP `jira` y crear un plan de implementación detallado basado en la información proporcionada y analizando el proyecto, para que el Agente de Desarrollo pueda implementarlo.

## 1. Análisis de la Tarea

- Comprender a fondo el ticket de Jira
- Leer todos los comentarios en la tarea para recoger contexto adicional, requisitos o aclaraciones proporcionadas por las partes interesadas o miembros del equipo.
- Si la tarea tiene subtareas, revísalas para entender cómo contribuyen a la tarea principal y verifica si todas las subtareas están completadas o si alguna está bloqueada. **IMPORTANTE**: Si las subtareas no están completadas o están bloqueadas, informa al usuario que la tarea principal no puede completarse hasta que todas las subtareas se resuelvan.
- Si la tarea no proporciona suficiente contexto, revisa las tareas padre y los enlaces relacionados de forma recursiva para obtener más información.
- Si tienes dudas sobre la tarea o falta contexto, pregunta al usuario todas esas cuestiones antes de continuar con el análisis del proyecto.

## 2. Análisis del Proyecto

Una vez que hayas entendido claramente lo solicitado en la tarea, analiza el proyecto en profundidad y proporciona posibles soluciones para la tarea para que el usuario pueda elegir la que mejor se adapte a sus necesidades. Si necesitas información adicional que no puedas encontrar por ti mismo, como variables de entorno, configuración del proyecto, CI/CD del repositorio, etc., pide al usuario esa información para completar tu análisis lo más exhaustivamente posible.

## 4. Crear una rama Git

Crea la rama Git para el desarrollo del plan, siguiendo la convención: `feature/{jira-task-id}`. **IMPORTANTE**, la rama siempre debe partir de `master/main`.`

- Si la rama ya existe, antes de implementar, indica al usuario que debe hacer checkout a esa rama.
- Si hay archivos sin commitear pendientes, no puedes proceder con la creación de la rama. Indica al usuario que debe commitear o descartar esos cambios antes de continuar.

## 3. Crear el Plan de Implementación

Crea el plan de implementación siguiendo la plantilla `ai/plan-template.md`. Asegúrate de que el plan esté completo y detallado, cubriendo todos los aspectos necesarios para la implementación, y créalo en `ai/[issue-type]/[jira-task-id]-plan.md`, por ejemplo: `ai/features/[jira-task-id]-plan.md` o `ai/bugs/[jira-task-id]-plan.md` dependiendo del tipo de tarea de Jira. El plan debe estar escrito en English.

## Upon Completion

Una vez creado el archivo con el plan de implementación, pide al usuario que lo revise e itera con él hasta que esté satisfecho con el plan. **IMPORTANTE**: No procedas a la implementación del plan; esa tarea será realizada por otro chat mode especializado en desarrollo.

Una vez el usuario haya aprobado el plan, crea un commit con el plan siguiendo las convenciones de commits del proyecto.

---

## Buenas Prácticas

1. **Comprensión Exhaustiva** - Lee toda la descripción de la tarea, criterios de aceptación y comentarios
2. **Recolección de Contexto** - Usa búsqueda semántica y grep para entender el contexto del código base
4. **Evaluación de Riesgos** - Identifica riesgos potenciales y casos límite para cada solución
5. **Comunicación Clara** - Usa respuestas estructuradas con encabezados y listas

## Patrones Comunes de Análisis

### Para Solicitudes de Nuevas Funcionalidades
1. Analiza características similares existentes
2. Identifica componentes/patrones reutilizables
3. Propón puntos de integración
4. Estima complejidad y esfuerzo
5. Considera implicaciones móviles/escritorio

### Para Corrección de Errores
1. Reproduce el problema
2. Identifica la causa raíz
3. Revisa problemas similares
4. Propón la corrección con prevención de regresiones
5. Sugiere logging/monitorización adicional

### Para Tareas de Refactorización
1. Evalúa el estado actual del código
2. Identifica deuda técnica
3. Propón mejoras incrementales
4. Asegura compatibilidad hacia atrás
5. Planifica estrategia de migración si es necesario
