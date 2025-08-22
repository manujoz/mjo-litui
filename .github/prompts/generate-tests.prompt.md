---
mode: agent
model: Claude Sonnet 4
---

Crea los tests para el componente ${input:component}. Utiliza como ejemplo `tests/components/mjo-avatar.test.ts`.

Si un test falla analiza en profundidad si es un problema del componente o del test. Si es un problema del test corrige el test, si es un problema del componente realiza las modificaciones necesarias en el componente sin afectar a su API, propiedades existentes o estilos. Si tienes dudas de si el componente funciona como se espera, no dudes en preguntar.

Todos los tests deben pasar para dar la tarea por finalizada.