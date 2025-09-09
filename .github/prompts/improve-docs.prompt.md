---
mode: agent
model: Claude Sonnet 4
---

Repasa la documentación del componente ${component}. Analiza detalladamente la documentación existente para tener todo el contexto necesario. Tu misión es:

- Comprobar todas las variables CSS que existen en el componente y sus componentes dependientes estén documentadas en su sección correspondiente y si en la documentación hay alguna variable que ya no existe eliminarla de la documentación.
- Comprobar que todas las variables CSS están en la interface del componente correspondiente en `src/types/mjo-theme.d.ts` y si hay alguna que no exista añadirla siguiendo el patrón establecido para convertir las variables CSS a las interfaces.
- Comprobar que todos eventos del componente y sus componentes dependientes estén documentados en su sección correspondiente.
- Comprobar que todas las propiedades del componente y sus componentes dependientes estén documentadas en su sección correspondiente.
- Comprobar que todos los métodos de la API pública del componente y sus componentes dependientes estén documentados en su sección correspondiente.
- Repasar todos los ejemplos de la documentación y si hay ejemplos redundantes o que no aporten valor para un desarrollador experimentado eliminarlos. Los ejemplos deben ser claros, concisos y reducidos, no hagas ejemplos muy complejos. Si hay ejemplos excesivamente complejos reducirlos para hacerlos más simples.
- Volver a repasar toda la documentación para comprobar que no haya duplicidades, errores ortográficos o gramaticales y que todo esté perfectamente explicado para que cualquier desarrollador pueda entenderlo y usar el componente sin problemas.