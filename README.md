# Portafolio Contabilidad

Professional portfolio website for accounting and financial consulting services.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)

## Setup

Open `index.html` directly in a browser, or serve the project with a live server extension for development.

## File Structure

```
├── index.html           # Main entry point
├── style.css            # Global styles
├── assets/              # Static assets (images, icons)
├── css/                 # Additional stylesheets
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   └── utils.css
├── components/          # JavaScript modules
│   ├── header.js        # Header logic
│   ├── carousel.js      # Calendar carousel
│   ├── about.js         # About section
│   ├── contact.js       # Contact form handling
│   ├── footer.js        # Footer logic
│   ├── config.js        # Site configuration
│   └── utils.js         # Utility functions
└── specs/               # Especificaciones SDD
    ├── header.md
    ├── about.md
    ├── services.md
    ├── contact.md
    └── footer.md
```

## 3. Flujo de trabajo (Especificar → Planificar → Tareas → Implementar)

### Diagrama de flujo

```
Especificar
    ↓
Planificar
    ↓
➜ Tareas
    ↓
Implementar → Tests → Refactorizar
```

### Paso a paso

**Especificar**
- Crear `specs/nombre-seccion.md` con:
  - Requisitos funcionales y no funcionales
  - Historias de usuario (ej: "Como visitante, quiero ver los servicios para decidir si contratar")
  - Criterios de aceptación (ej: "Los servicios se cargan en < 2s")
  - Casos borde (ej: "Sin conexión, mostrar mensaje offline")

**Planificar**
- Identificar componentes necesarios
- Definir estructura de archivos (`components/`, `css/`)
- Listar dependencias entre componentes
- Establecer orden de implementación (header → hero → about → services → contact → footer)

**Tareas**
- Tareas pequeñas y verificables:
  - "Crear HTML del formulario de contacto"
  - "Añadir estilos base de la sección"
  - "Implementar validación JS del formulario"
  - "Conectar formulario a API de email"

**Implementar**
- Escribir tests (TDD) → Código → Refactor
- Verificar criterios de aceptación
- Documentar cambios en specs