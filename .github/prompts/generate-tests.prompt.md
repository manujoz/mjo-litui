---
mode: agent
model: Claude Sonnet 4
---

Crea los tests para el componente ${input:component}. Utiliza como ejemplo `tests/components/mjo-avatar.test.ts` y `tests/components/mjo-pagination.test.ts`. Es muy importante que sigas la misma estructura y analices como están hechos los tests existentes antes de realizar el plan.

Crea un todo con todos los tests a realizar organizados por `suite`, por ejemplo: `suite("BasicRender")`, `suite("Properties")`, etc. y preséntamelos antes de empezar a desarrollarlos.

Crea los tests poco a poco una `suite` por cada iteración, después de crear cada `suite` valida que pasan y solo entonces pasa a la siguiente `suite`, así sucesivamente hasta terminar toda la lista.

Si un test falla analiza en profundidad si es un problema del componente o del test. Si es un problema del test corrige el test, si es un problema del componente realiza las modificaciones necesarias en el componente sin afectar a su API, propiedades existentes o estilos. Si tienes dudas de si el componente funciona como se espera, no dudes en preguntar.

Todos los tests deben pasar para dar la tarea por finalizada.