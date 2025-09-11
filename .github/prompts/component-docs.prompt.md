---
mode: agent
model: Claude Sonnet 4
---

Crear la documentación del componente ${component}. Analiza como es la documentación del `mjo-button` y sigue exactamente el mismo patrón. 

Para crear la documentación del componente es necesario que estudies su funcionamiento en profundidad, propiedades, eventos si los tiene, variables CSS, etc.. Todo debe quedar perfecatmente explicado para que cualquiera que quiera hacer uso de él pueda usarlo completamente. 

Busca la interfaz de tema del componente en `src/types/mjo-theme.d.ts`, si no la tiene creala, siguiendo el patrón de todas ls demás interfaces de tema, si no entiendes como es el patrón al pasar las variables CSS a propiedades de la interfaz preguntame antes de hacer nada. Si la tiene sincroniza las propiedades de la interfaz con las variables CSS que tenga el componente.

- Toda la API pública del componente tiene que quedar correctamente documentada.
- Todas las propiedades del componente tienen que quedar correctamente documentadas.
- Todas las variables CSS tienen que quedar correctamente documentadas.
- Todas las CSS parts tienen que quedar correctamente documentadas.
- Todos los eventos que emite el componente tienen que quedar correctamente documentados.
- La interfaz del tema en `src/types/mjo-theme.d.ts` tiene que quedar correctamente documentada.

Busca también el la carpeta `src/types` para entender mejor los tipos utilizados en el componente si los tiene y los tipos del tema que se le pueden aplicar con el `ThemeMixin` si lo tiene. En los ejemplos usa el tipado para todo.

Si tienes alguna duda sobre algo me lo puedes preguntar.