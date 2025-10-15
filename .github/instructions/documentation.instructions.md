---
applyTo: 'docs/**/*.md'
description: Instrucciones para crear y mantener documentación técnica clara y concisa.
---


# Estructura de la documentación

```
docs/
    ├── README.md               # Índice principal de la documentación
    ├── getting-started.md      # Guía de inicio rápido
    ├── build-process.md        # Documentación del proceso de construcción
    ├── testing.md              # Documentación del proceso de pruebas
    ├── mjo-accordion.md        # Documentación del componente de acordeón
    ├── mjo-alert.md            # Documentación del componente de alerta
    ├── mjo-avatar.md           # Documentación del componente de avatar
    ├── mjo-*.md                # Documentación de otros componentes de la librería (uno por archivo)
    ├── theming.md              # Documentación del proceso de personalización
    └── changelog.md            # Registro de cambios y versiones
```

# Principios de documentación -> ⚠️ IMPORTANTE NO SALTARSE ESTOS PRINCIPIOS

## 1. Calidad del contenido
- **Se explícito pero conciso**: Explica todo lo que es relevante pero sin verborrea innecesaria.
- **Evita la repetición**: No repitas información en diferentes secciones.
- **Evita ejemplos obvios**: No incluyas ejemplos que sean evidentes o que no aporten valor adicional.
- **Enfoque práctico**: Prioriza patrones y usos en el mundo real sobre explicaciones teóricas.
- **Actualización continua**: Mantén la documentación actualizada con cada cambio en el proyecto.

## 2. archivo README.md e indices de la documentación

- **README.md**: Debe ser un índice claro y organizado de toda la documentación, con enlaces a cada sección o archivo relevante.
- **Debe contener**:
  - Introducción al proyecto.
  - Enlaces a guías principales (inicio rápido, construcción, pruebas).
  - Enlaces a la documentación de cada componente.
  - Enlace al changelog.
- **No debe contener**:
  - Detalles técnicos o explicaciones extensas (deja eso para los archivos específicos).
  - Ejemplos de código
  - Información técnica de documentación que debería estar en archivos específicos.

## 3. Contenido detallada en archivos dedicardos

- La implementación de detalles, guias y explicaciones técnicas deben estar en **archivos dedicados**. 
- Cada archivo debe centrarse en un tema específico (por ejemplo, un componente, una guía de inicio, etc.).
- Usa nombres de archivo descriptivos y consistentes (por ejemplo, `mjo-button.md` para la documentación del componente botón).

## 4. Manten la integridad y consistencia

Cuando creas nueva documentación:
1. **Actualiza el README.md** y archivos que tengas enlaces relacionados con los enlaces a la nueva documentación.
2. **Manten los índices sincronizados**: Si tienes índices o tablas de contenido en otros archivos, asegúrate de que estén actualizados con la nueva documentación.
3. **Verifica todos los links dentro de docs/**: Asegúrate de que todos los enlaces internos y externos funcionen correctamente.

Cuando actualizas documentación existente:
1. **Lee el archivo completo**: Asegúrate de entender todo el contenido antes de hacer cambios e identifica donde añadir el nuevo contenido.
2. **No dupliques contenido**: Asegúrate de que no estás repitiendo información que ya existe en el archivo.

# Reglas -> ⚠️ CRÍTICO NO SALTARSE ESTAS REGLAS

## Cuando creas dcocumentación:
- ✅ Escribe un contenido claro y con tono profesional para desarrolladores experimentados.
- ✅ Enfócate en las especifidades del proyecto, patrones y convenciones.
- ✅ Crea ejemplos concisos que demuestren comportamientos que no son obvios.
- ✅ Actualiza el README.md y cualquier índice relevante.
- ❌ NO ESCRIBAS explicaciones teóricas o información básica.
- ❌ NO REPITAS información en diferentes secciones.
- ❌ NO INCLUYAS ejemplos obvios o que no aporten valor.
- ❌ NO INCLUYAS información irrelevante o desactualizada.
- ❌ NO DETALLES TÉCNICOS en el README.md o índices, déjalo para archivos específicos.

## Cuando actualizas documentación existente:
- ✅ Lee el archivo completo para entender el contexto.
- ✅ Encuentra el lugar apropiado para añadir o modificar contenido, **CRITICO**: Mantén la coherencia del contenido.
- ✅ No dupliques contenido: Asegúrate de que no estás repitiendo información que ya existe en el archivo.
- ✅ Mantén la coherencia en el estilo y formato.
- ✅ Preserva la organización gerárquica del contenido.
- ❌ NO HAGAS CAMBIOS SUPERFICIALES que no aporten valor.
- ❌ NO ELIMINES información relevante sin una razón válida.

# Guia de comunicación

Comunica de forma clara y concisas con tono profesional y cercano.
<examples>
- "He analizado el código y he encontrado un área de mejora en la función X."
- "El bug que reportaste parece estar relacionado con la implementación de Y."
- "Necesito analizar varios archivos aquí, por favor espera un momento."
- "Veamos cómo se implementa Z en el código."
- "He encontrado un patrón en el código que podría ser optimizado."
- "Para crear la feature que mencionaste, necesitamos considerar A, B y C."
</examples>

**IMPORTANTE**:
- Responde de forma clara y usando viñetas y bloques de código cuando sea necesario.
- No hables demasiado mientras trabajas para ahorrar tokens, se conciso y al grano.