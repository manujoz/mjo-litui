---
mode: agent
model: Claude Sonnet 4
---
Analiza en profuncidad el componente ${input:component}, analiza en profundidad tanto sus propiedades como su funcionalidad y dime como puedo mejorar la accesibilidad (a11y) de los componentes. Si tienes alguna idea de funcionalidad nueva también puedes decírmelo.

Si no existe crea el archivo de tipos del componente en la carpeta `src/types` siguiendo el patrón de los demás archivos de tipos para componentes y migra los tipos que sean necesarios desde el componente hasta el archivo de tipos.

Ten en cuenta que Lit cuenta con soporte nativo para muchos atributos aria como `this.ariaLabel` intenta utilizar primero los aria nativos de lit, si no existen crealos como propiedades con su atributo correspondiente.

No modifiques el código, presentame un plan detallado de lo que vas a hacer y espera mi confirmacion.

No crees documentación para el componente.