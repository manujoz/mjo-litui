# Copilot Instructions for mjo-litui

Este documento ayuda a agentes de IA (Copilot, Claude, etc.) a navegar y contribuir al proyecto **mjo-litui**, una librería de Web Components basada en LitElement.

## 0. Idioma

- Te comunicas conmigo en español
- Todo lo relacionado con el código debe ser en inglés
- Toda la documentación debe ser en inglés

## 1. Visión General del Proyecto

- Paquete npm: `mjo-litui` (versión 0.0.1-alpha.49).
- Web Components con prefijo `mjo-` (e.g., `mjo-button`, `mjo-modal`).
- Construido con TypeScript, Lit 3, Vite y Storybook.

## 2. Arquitectura y Estructura de Carpetas

```
src/
  mjo-*.ts           # Componentes principales
  components/        # Componentes auxiliares para los componentes principales ordenados por subcarpetas
  controllers/       # Controladores para overlays (drawer, modal, notification)
  mixins/            # Mixins para formularios, temas y validación
  theme/             # Temas predeterminados (default-theme.ts)
  types/             # Declaraciones de tipos (.d.ts)
  utils/             # Utilidades varias (shadow-dom, dropdown)
stories/             # Archivos .stories.ts para Storybook
vite.config.ts       # Configuración de Vite (CSS modules, SVG optimización)
package.json         # Scripts y dependencias clave
README.md            # Documentación de nivel superior
``` 

## 3. Patrones de Componente

- Cada archivo `src/mjo-*.ts` registra un custom element:
  ```ts
  @customElement('mjo-button')
  export class MjoButton extends LitElement { ... }
  ```
- Los compoentes deben seguir la siguiente jerarquía:
    - Propiedades `@property()` deben ser definidas antes de cualquier método.
    - Estados `@state()` deben ser definidos antes de cualquier método.
    - Propiedades no reactivas.
    - Render
    - Métodos propios de lit: `connectedCallback`, `disconnectedCallback`, `update`, etc...
    - Métodos personalizados públicos.
    - Métodos privados con `#`, ej. `#handleClick`.
    - Estilos `static styles = [...]`
- CSS encapsulado vía Shadow DOM.
- Los eventos se manejan con `@event` y `this.dispatchEvent(...)`.

## 4. Flujo de Datos y Controladores

- Overlays (drawer, modal, notification) usan `controllers/*-controller.ts`:
  - Instancian contenedores dinámicos (`*Container`) en el `<body>`.
  - Manejan colas y animaciones.

## 5. Temas y Estilos

- `theme/default-theme.ts`: valores de color y tipografía.

## 6. Flujo de Desarrollo

- `npm run dev`: arranca Vite en modo desarrollo. Los archivos del servidor de desarrollo para renderizar los componentes que se están desarrollando estan en `dev/`.
- `npm run build`: compila TypeScript (`tsconfig.build.json`), copia tipos y publica desde `dist/`.
- `npm run preview`: sirve build de Vite para pruebas locales.

## 7. Agregar Nuevos Componentes

1. Crear `src/mjo-nombre.ts` con prefijo `mjo-` y decorar con `@customElement`.
2. Exportar en `src/index.ts` para incluir en bundle.
3. Añadir tipo en `src/types/mjo-nombre.d.ts`.
4. Actualizar tests o lint-staged si es necesario.

## 8. Publicación

- El comando de build copia `package.json`, `.npmignore` y `README.md` a `dist/` antes de `npm publish`.
- Verificar versión en `package.json` (0.0.1-alpha.{n}).

## 9. Convenciones

- Prefijo obligatorio `mjo-`.
- Tipos definidoss en `src/types`.
- Evitar dependencias adicionales aparte de `lit`, `@lit/context`, `mjo-icons`.
- Animaciones basadas en CSS custom properties y mixins.

## 10. Documentación

- La documentación del proyecto debe estar escrita en inglés.
- El README.md debe contener información sobre la instalación y uso general de la librería.
- Cada componente debe estar documentado en la carpeta `docs/mjo-<nombre-del-componente>.md` con todos los detalles del componente, su utilidad, uso, propiedades, métodos públicos, eventos y variables css así como también los estilos que se pueden asignar en estilos.
- Incluir ejemplos del uso del componente.

### 10.1 Patrones de documentación (estilo unificado)

- Ejemplos en TypeScript usando Lit: siempre `import { LitElement, html } from 'lit'` y `@customElement('example-...')`.
- Preferir imports específicos de componentes: `import 'mjo-litui/mjo-button'` sobre `import 'mjo-litui'` salvo en ejemplos que requieren todo.
- Bloques de código etiquetados: usar "ts" para snippets de Lit y "html" cuando sea markup puro.
- Nombres de ejemplos: prefijo `example-` + descripción (`example-button-basic`, `example-toggle-theme`).
- Tablas para propiedades, slots, eventos y variables CSS con columnas: Name | Type | Default | Description.
- Evitar repetir la lista de variables globales en cada componente; referenciar `theming.md`.
- Incluir al menos: Usage (HTML), Lit example, Attributes/Properties (tabla), Slots, Events, Relevant CSS Variables (tabla), notas de herencia de tokens globales.
- Para theming en ejemplos: mostrar `.config` y `.theme` bindings en `<mjo-theme>` y `.theme` prop para overrides puntuales (ThemeMixin).