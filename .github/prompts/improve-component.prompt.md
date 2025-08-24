---
mode: agent
model: Claude Sonnet 4
---

## Análisis

Analiza en profuncidad el componente ${input:component}, analiza en profundidad tanto sus propiedades como su funcionalidad y dime como puedo mejorar la accesibilidad (a11y) de los componentes. Si tienes alguna idea de funcionalidad nueva también puedes decírmelo.

Si el componente tiene componentes dependiente en la carpeta `src/components`, asegúrate de que también se analicen y mejoren en términos de accesibilidad. Y si tiene un controlador analiza el controlador para enteder su funcionamiento.

## Desarrollo

Si no existe crea el archivo de tipos del componente en la carpeta `src/types` siguiendo el patrón de los demás archivos de tipos para componentes y migra los tipos que sean necesarios desde el componente hasta el archivo de tipos. Las interfaces de estilos para relacionadas con el ThemeMixin van en `src/types/mjo-theme.d.ts`, compruba si existen en este archivo y si están actalizadas.

Ten en cuenta que Lit cuenta con soporte nativo para muchos atributos aria como `this.ariaLabel` intenta utilizar primero los aria nativos de lit, si no existen crealos como propiedades con su atributo correspondiente.

Excepto para los atributos relacionados con accesibilidad (**aria**) nunca utilices el attributo al crear una propiedad:

- Incorrecto: `@property({ type: String, attribute: "name-attr" }) nameAttr?: string;`
- Correcto: `@property({ type: String }) nameAttr?: string;`
- Correcto: `@property({ type: String, attribute: "aria-label" }) ariaLabel?: string;`

Añade al final del componente el `HTMLElementEventMap` con el mapa de los custom events del componente. La definición de tipos de los eventos debe estar en el archivo de tipos correspondiente.

No modifiques el código, presentame un plan detallado de lo que vas a hacer y espera mi confirmacion. 

Los nombres de los eventos van a seguir esta convención: `mjo-component-name:event-name`, por ejemplo `mjo-date-picker:change` o `mjo-textfield:change`. Si el componente tiene un customEvent que no siga esta convención hay que cambiarlo (sin mantener retrocompatibilidad) y anotarlo para modificarlo/añadirlo a la documentación.

No utilices `npx tsc` para probar archivos typescript ya que la configuración de typescript arroja errores en su lugar compila el proyecto con `npm run build`

## Documentación

Analiza en profundidad el componente y su documentación y actualiza la documentación del componente para reflejar los nuevos cambios. Elimina de la documentación propiedades o métodos que ya no existan en el componente, añade a la documentación cualquier nueva propiedad o método que se haya introducido.

Compara todas las variables CSS del componente y de sus componentes relacionados con las variables que hay en la documentación para que estas estén correctamente documentadas. Las variables del componente son las que empiezan con el prefijo `--mjo-component-xxxx` por ejemplo, para `mjo-avatar` la variable sería `--mjo-avatar`, para el `mjo-color-picker` sería `--mjo-color-picker`.

Haz especial incapié en el nombre de los eventos en la documentación que estén correctos y con su interface correspondiente.

**¡IMPORTANTE!** Sé muy conciso con la documentación tiene que ser práctica de leer pero no contener muchos ejemplos redundantes o que para un desarrollador no tiene demasiada relevancia. 

Despues de actualizar el archivo de documentación del archivo es necesario volver a revisar el archivo entero y quita los ejemplos redundantes o simplifica los que estén extradellados que para un desarrollador no aporten valor. El archivo de documentación tiene que quedar útil pero que no sea tedioso para los desarrolladores que van a usarlo.

No crear tests del componente.
