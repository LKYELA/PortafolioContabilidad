// ─── Site Configuration ───────────────────────────────────────────────────────
// Centralised constants: brand, contact, traffic, content, animation timings.
// Update this file only — do not hardcode any of these values elsewhere.

export const SITE = Object.freeze({
   name: 'LKY consultores',
   tagline: 'Contadora Pública especializada en finanzas corporativas y asesoría contable.',
   role: 'Contadora Pública',
   specialty: 'Especialista en Finanzas',
   locale: 'es-CO',
 });

/** External links used throughout the site — update URLs here instead of in markup. */
export const LINKS = Object.freeze({
   home: '/',
   facebook: 'https://facebook.com/',
   whatsapp: 'https://wa.me/571234567890',
   linkedin: 'https://linkedin.com/',
   twitter: 'https://twitter.com/',
   instagram: 'https://instagram.com/',
   ariaHome: 'Inicio',
   ariaMenu: 'Abrir menú',
   scrollToTopAria: 'Volver arriba',
});

/** Public contact information — one source of truth. */
export const CONTACT = Object.freeze({
   phone: '+57 1 234 567 890',
   email: 'contacto@luzkarimeyela.com',
   address: 'Calle 123 #45-67, Bogotá, Colombia',
   hours: 'Lunes a Viernes, 8:00 a.m. – 6:00 p.m.',
   formSubmitDelay: 1500,   // ms — simulated server round-trip
   statusClearDelay: 5000,  // ms — how long the success banner stays visible
   newsletterResetDelay: 2000, // ms
});

/** Text labels used in forms and buttons — keep in sync if you change language. */
export const MESSAGES = Object.freeze({
   contactSuccess: '¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.',
   contactValidating: 'Por favor completa todos los campos correctamente.',
   contactSubmitBtn: 'Enviar mensaje',
   contactTagline: 'Agenda tu cita y recibe asesoría personalizada en contabilidad y finanzas.',
   newsletterSuccess: '¡Gracias!',
   newsletterPlaceholder: 'Tu email',
   footerNewsletter: 'Suscríbete para recibir noticias y actualizaciones.',
   quickLinks: {
     about: 'Sobre mí',
     services: 'Servicios',
     blog: 'Blog',
     contact: 'Contacto',
   },
});

/** Animatable durations — change in one place to affect all counters / observers. */
export const ANIMATION = Object.freeze({
   counterIncrementDivisor: 50,   // larger = slower counter
   counterTickMs: 30,             // ms between each counter tick
   observeDefaultThreshold: 0.1,
   observeDefaultRootMargin: '0px 0px -50px 0px',
   scrollToTopThreshold: 300,     // px from top before revealing the button
   backToTopOffset: 30,           // px from viewport edge
   serviceCardStaggerDelay: 0.1,  // seconds between each card
});

/** Navigation labels — centralised to avoid spelling drift. */
export const NAV = Object.freeze({
   about: 'About',
   services: 'Servicios',
   blog: 'Blog',
   contact: 'Contacto',
   cta: 'Agendar cita',
});

/** Font Awesome CDN — override only if you self-host or pin a different version. */
export const ASSETS = Object.freeze({
   fontAwesomeCss: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
   fontAwesomeIntegrity:
     'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==',
});

/** Calendar data for the hero carousel */
export const CAROUSEL_DATA = Object.freeze([
  {
    number: '02',
    title: 'Declaración mensual y pago – Gasolina y ACPM',
    headers: ['Mes', 'Fecha límite'],
    rows: [
      ['Enero', '<strong>13 de febrero</strong>'],
      ['Febrero', '<strong>13 de marzo</strong>'],
      ['Marzo', '<strong>16 de abril</strong>'],
      ['Abril', '<strong>15 de mayo</strong>'],
      ['Mayo', '<strong>16 de junio</strong>'],
      ['Junio', '<strong>14 de julio</strong>'],
      ['Julio', '<strong>18 de agosto</strong>'],
      ['Agosto', '<strong>14 de septiembre</strong>'],
      ['Septiembre', '<strong>15 de octubre</strong>'],
      ['Octubre', '<strong>17 de noviembre</strong>'],
      ['Noviembre', '<strong>15 de diciembre</strong>'],
      ['Diciembre', '<strong>18 de enero de 2027</strong>'],
    ]
  },
  {
    number: '03',
    title: 'Declaración y pago – Carbono',
    headers: ['Bimestre', 'Fecha límite'],
    rows: [
      ['Enero – Febrero', '<strong>13 de marzo</strong>'],
      ['Marzo – Abril', '<strong>15 de mayo</strong>'],
      ['Mayo – Junio', '<strong>14 de julio</strong>'],
      ['Julio – Agosto', '<strong>14 de septiembre</strong>'],
      ['Septiembre – Octubre', '<strong>17 de noviembre</strong>'],
      ['Noviembre – Diciembre', '<strong>18 de enero de 2027</strong>'],
    ]
  },
  {
    number: '04',
    title: 'Declaración anual y pago – RST (Régimen Simple de Tributación)',
    headers: ['Concepto', 'Fecha límite'],
    rows: [
      ['Declaración anual', '<strong>Hasta abril</strong> (por último dígito del NIT)'],
      ['Anticipo bimestral (ene–feb)', '<strong>Hasta mayo</strong>'],
      ['Anticipo bimestral (mar–abr)', '<strong>Hasta junio</strong>'],
      ['Anticipo bimestral (may–jun)', '<strong>Hasta julio</strong>'],
      ['Anticipo bimestral (jul–ago)', '<strong>Hasta septiembre</strong>'],
      ['Anticipo bimestral (sep–oct)', '<strong>Hasta noviembre</strong>'],
      ['Anticipo bimestral (nov–dic)', '<strong>Hasta enero de 2027</strong>'],
      ['', '<em>Consultar calendario DIAN oficial</em>'],
    ]
  },
  {
    number: '05',
    title: 'Declaración y pago bimestral – IVA prestadores de servicios desde el exterior',
    headers: ['Bimestre', 'Fecha límite'],
    rows: [
      ['Enero – Febrero', '<strong>13 de marzo</strong>'],
      ['Marzo – Abril', '<strong>15 de mayo</strong>'],
      ['Mayo – Junio', '<strong>14 de julio</strong>'],
      ['Julio – Agosto', '<strong>14 de septiembre</strong>'],
      ['Septiembre – Octubre', '<strong>17 de noviembre</strong>'],
      ['Noviembre – Diciembre', '<strong>18 de enero de 2027</strong>'],
    ]
  },
  {
    number: '06',
    title: 'Declaración y pago – Patrimonio',
    headers: ['Cuota', 'Fecha límite'],
    rows: [
      ['Primera cuota', '<strong>14 de septiembre</strong>'],
      ['Segunda cuota', 'Por confirmar <em>(Consultar calendario DIAN oficial)</em>'],
    ]
  },
  {
    number: '07',
    title: 'Presentación y pago – Productos plásticos de un solo uso',
    headers: ['Periodo', 'Fecha límite'],
    rows: [
      ['Anual', '<strong>Hasta febrero</strong> <em>(día exacto por confirmar)</em>'],
    ]
  },
  {
    number: '08',
    title: 'Presentación y pago – Bebidas ultraprocesadas azucaradas y productos comestibles ultraprocesados',
    headers: ['Bimestre', 'Fecha límite'],
    rows: [
      ['Enero – Febrero', '<strong>13 de marzo</strong>'],
      ['Marzo – Abril', '<strong>15 de mayo</strong>'],
      ['Mayo – Junio', '<strong>14 de julio</strong>'],
      ['Julio – Agosto', '<strong>14 de septiembre</strong>'],
      ['Septiembre – Octubre', '<strong>17 de noviembre</strong>'],
      ['Noviembre – Diciembre', '<strong>18 de enero de 2027</strong>'],
    ]
  },
  {
    number: '09',
    title: 'Pagos anticipados bimestrales – Presencia Económica Significativa (PES)',
    headers: ['Bimestre', 'Fecha límite'],
    rows: [
      ['Enero – Febrero', '<strong>13 de marzo</strong>'],
      ['Marzo – Abril', '<strong>15 de mayo</strong>'],
      ['Mayo – Junio', '<strong>14 de julio</strong>'],
      ['Julio – Agosto', '<strong>14 de septiembre</strong>'],
      ['Septiembre – Octubre', '<strong>17 de noviembre</strong>'],
      ['Noviembre – Diciembre', '<strong>18 de enero de 2027</strong>'],
    ]
  },
  {
    number: '10',
    title: 'Declaración anual – Activos en el exterior',
    headers: ['Concepto', 'Fecha límite'],
    rows: [
      ['Año gravable 2025', '<em>Consultar calendario de renta</em> <small>(variantes por tipo de contribuyente y último dígito del NIT)</small>'],
    ]
  },
  {
    number: '11',
    title: 'Registro Único de Beneficiarios Finales (RUB)',
    headers: ['Periodo', 'Fecha límite'],
    rows: [
      ['Anual / Eventual', '<strong>13 de mes por definir</strong><br><em>Consultar calendario DIAN oficial</em>'],
    ]
  },
  {
    number: '12',
    title: 'Informe país por país (Country-by-Country Report)',
    headers: ['Periodo', 'Fecha límite'],
    rows: [
      ['Anual', '<strong>15 de diciembre</strong><br><em>Independiente del NIT</em>'],
    ]
  },
  {
    number: '13',
    title: 'Precios de transferencia (Transfer Pricing) – declaración informativa y documentación comprobatoria',
    headers: ['Documento', 'Fecha límite'],
    rows: [
      ['Declaración informativa y documentación comprobatoria', '<strong>Hasta septiembre</strong> <em>(día exacto por confirmar)</em>'],
    ]
  }
);