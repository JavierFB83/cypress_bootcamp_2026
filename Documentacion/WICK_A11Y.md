# wick-a11y: Guía de instalación, configuración y uso

## ¿Qué es wick-a11y?

wick-a11y es un plugin para Cypress que permite realizar análisis de accesibilidad automatizados en tus aplicaciones web, soportando los estándares WCAG 2.2 (A–AAA). Genera reportes detallados, resalta visualmente los problemas en el runner de Cypress y puede dar feedback por voz.

---

## Instalación

1. Instala el paquete como dependencia de desarrollo:

```bash
npm install wick-a11y --save-dev
```

---

## Configuración

### 1. Agrega las tareas de accesibilidad en `cypress.config.js`

Edita tu archivo `cypress.config.js` e importa y usa las tareas de wick-a11y en la función `setupNodeEvents`:

```js
const addAccessibilityTasks = require('wick-a11y/accessibility-tasks');

module.exports = defineConfig({
  // ...
  e2e: {
    async setupNodeEvents(on, config) {
      // ...
      addAccessibilityTasks(on);
      // ...
      return config;
    },
  },
});
```

### 2. Importa los comandos personalizados

Agrega la siguiente línea en tu archivo `cypress/support/e2e.js`:

```js
import 'wick-a11y';
```

---

## Opciones de configuración adicionales

- **Carpeta de reportes:** Por defecto, los reportes HTML se guardan en `cypress/accessibility`. Puedes cambiarlo con la opción `accessibilityFolder` en `cypress.config.js`:

```js
module.exports = defineConfig({
  // ...
  accessibilityFolder: 'cypress/mi-carpeta-a11y',
  // ...
});
```

- **Variables de entorno:**
  - `generateReport`: Controla el tipo de reporte (`detailed`, `basic`, `none`).
  - `enableAccessibilityVoice`: Activa el feedback por voz en el runner.

Puedes definirlas en `cypress.env.json`, en la propiedad `env` de `cypress.config.js`, o por línea de comandos:

```json
{
  "enableAccessibilityVoice": true
}
```

---

## Uso básico en tus tests

Llama a `cy.checkAccessibility()` en tus tests para analizar la accesibilidad de la página o de un contexto específico:

```js
describe('Accesibilidad', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('analiza la accesibilidad de la página', () => {
    cy.checkAccessibility();
  });
});
```

Puedes personalizar el análisis pasando opciones:

```js
cy.checkAccessibility(null, {
  includedImpacts: ['critical', 'serious', 'moderate', 'minor'],
  generateReport: 'basic',
});
```

---

## Resultados y reportes

- Los resultados se muestran en el log de Cypress y visualmente en el runner.
- Se generan reportes HTML en la carpeta configurada.
- Si activas la voz, puedes escuchar los resultados en el runner.

---

## Recursos
- [Repositorio wick-a11y](https://github.com/sclavijosuero/wick-a11y)
- [Documentación oficial Cypress](https://docs.cypress.io/app/guides/accessibility-testing)
- [Video tutorial (Español)](https://www.youtube.com/playlist?list=PLJZz46d_HRpjDPUPirWAaP2NXRFX-xxGd)

---

## Notas
- Solo se puede ejecutar un análisis de accesibilidad por test.
- El feedback por voz solo funciona en modo interactivo (`npx cypress open`).
- Si no hay violaciones, no se genera reporte.

---

¡Listo! Ahora puedes analizar la accesibilidad de tus aplicaciones con Cypress y wick-a11y.
