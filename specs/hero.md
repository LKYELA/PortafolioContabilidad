# Especificación: Hero

## Historia de usuario
Como visitante, quiero ver una sección Hero llamativa con información clara para poder entender de inmediato el propósito del sitio y contactar a la especialista.

## Requisitos funcionales
- RF1: Mostrar el nombre del sitio (`SITE.name`) como título principal.
- RF2: Mostrar el tagline (`SITE.tagline`) debajo del título.
- RF3: Mostrar el rol (`SITE.role`) y especialidad (`SITE.specialty`) como subtítulo destacado.
- RF4: Incluir botón CTA ("Agendar cita") que navegue a la sección de contacto.
- RF5: Mostrar imagen de fondo (heroImage) con overlay oscuro para legibilidad del texto.

## Requisitos no funcionales (diseño, rendimiento, accesibilidad)
- RNF1: Altura mínima de 100vh en desktop, 80vh en móvil.
- RNF2: Imagen de fondo debe cargarse con lazy loading.
- RNF3: Texto debe tener contraste suficiente (WCAG AA) contra el fondo.
- RNF4: Botón debe ser accesible vía teclado (focus visible).

## Criterios de aceptación
- CA1: Dado que el usuario visita la página, cuando la sección Hero se renderiza, entonces debe mostrar `SITE.name` como título principal.
- CA2: Dado que el usuario está en la página principal, cuando hace clic en el botón "Agendar cita", entonces debe navegar suavemente a la sección de contacto.
- CA3: Dado que el usuario tiene JavaScript deshabilitado, cuando carga la página, entonces el hero debe mostrarse con color de fondo sólido como fallback.

## Datos de ejemplo (desde config.js)
- `SITE.name` → "LKY consultores"
- `SITE.tagline` → "Contadora Pública especializada en finanzas corporativas y asesoría contable."
- `SITE.role` → "Contadora Pública"
- `SITE.specialty` → "Especialista en Finanzas"
- `NAV.cta` → "Agendar cita"

## Casos borde
- Qué pasa si no hay imagen de fondo: usar color de fondo sólido (#1a365d) con overlay oscuro.
- Comportamiento en móvil: padding reducido, texto centrado, botón full width.