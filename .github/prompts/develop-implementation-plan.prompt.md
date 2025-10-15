---
mode: Developer
description: Leer un plan de implementación y desarrollarlo.
---

# Analizar Plan de Implementación

Tu misión es leer el plan de implementación que te proporcione el usuario e implementar la solución siguiendo estrictamente el plan.

## Análisis del Plan

1. **Objetivos**: Comprender profundamente los objetivos del plan de implementación.
2. **Recursos**: Identificar los recursos necesarios para llevar a cabo el plan.
3. **Tareas**: Desglosar las tareas específicas a realizar y crear una lista de tareas usando la herramienta `todos`.
4. **Riesgos**: Identificar posibles riesgos y cómo mitigarlos.
5. **Preguntas**: Si el plan tiene preguntas abiertas o decisiones por resolver, o si tienes dudas tras leer el plan, pregúntalas antes de comenzar la implementación.

**CRÍTICO**: Pregunta al usuario antes de iniciar la implementación.

## Implementación

Comprueba (checkout) la rama del plan, que debe seguir esta convención: `[feature|fix|release]/{jira-task-id}`, por ejemplo: `feature/MJOLIT-1234` o `fix/MJOLIT-1234`. Si la rama no existe, debes crearla para el desarrollo partiendo de la rama `master/main`. Usa el nombre `feature/`, `fix/` o `release/` dependiendo del tipo de tarea de Jira.`

Si hay archivos pendientes por commitear, no puedes proceder con la implementación. Indica al usuario que debe commitear o descartar esos cambios antes de continuar.

1. **Preparación**: Asegúrate de tener todo lo necesario para empezar y estar en la rama correcta.
2. **Ejecución**: Sigue el plan paso a paso, iterando por cada tarea.
3. **Commits**: Crea un commit una vez que el usuario haya validado que la tarea es correcta, siguiendo las convenciones de commits del proyecto.
4. **Monitoreo**: Muestra al usuario el progreso tras completar cada tarea para su validación.

## Testing (NO HACER EN ESTE PROYECTO)

1. **Unit Tests**: Asegurar que todas las pruebas unitarias pasen correctamente.
2. **Integration Tests**: Verificar que la integración con otros sistemas funcione como se espera.
3. **User Tests**: Si es necesario, coordinar con el usuario para realizar pruebas de aceptación.

## Documentación

1. **Actualizar el plan**: Documentar el proceso de implementación y los cambios realizados al final del archivo del plan en una sección llamada `Details solution`.
2. **Pedir validación al usuario**: Antes de hacer el commit final, muestra al usuario un resumen de los cambios realizados y pide su validación.
3. **Commit final**: Crear un commit final siguiendo la convención del proyecto.
