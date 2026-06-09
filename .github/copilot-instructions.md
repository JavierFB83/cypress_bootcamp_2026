# Instrucciones del proyecto — Cypress Bootcamp 2026

## Stack tecnológico
- Cypress 15+ para tests E2E
- Cucumber (Gherkin) con @badeball/cypress-cucumber-preprocessor
- JavaScript (ES6+)
- Page Object Model (POM) como patrón de diseño
- cypress-plugin-api para pruebas de API
- cypress-mochawesome-reporter como reporter
- wick-a11y para accesibilidad
- GitHub Actions para CI/CD
- Slack Webhooks para notificaciones

## Estructura del proyecto
- Pages (POM): `cypress/e2e/pages/`
- Step definitions: `cypress/e2e/step_definitions/`
- Features (Gherkin): `cypress/e2e/tests/features/`
- Tests directos: `cypress/e2e/tests/describe_test/`
- Tests API: `cypress/e2e/tests/apiTests/`
- Fixtures: `cypress/fixtures/`
- Soporte: `cypress/support/`
- Workflows CI/CD: `.github/workflows/`
- Documentación: `Documentacion/`

## Convenciones de código

### Page Object Model
- Toda Page hereda de `CommonPage` (`cypress/e2e/pages/CommonPage.js`).
- Los métodos de selección empiezan con `get` y devuelven `cy.get()` para encadenar.
- Los métodos de acción empiezan con `click`, `type`, `clear` y NO devuelven nada.
- Los métodos de aserción empiezan con `assert`.
- Se exporta una instancia: `export default new MiPage()`.
- CommonPage provee métodos genéricos: `getByAttribute()`, `getByAriaLabel()`, `getByFormControl()`, `getByPlaceholder()`, `getByType()`, `getByHref()`, `getByRouterLink()`, `getByToastMessage()`, `searchProduct()`, `clickProductCard()`, `navigateToProduct()`, `assertToastMessage()`.

### Tests con Cucumber
- Los Features usan tags: `@regression`, `@smoke`, `@login`, `@purchaseFlow`, `@filters`, `@homePage`.
- Los Step Definitions importan la Page correspondiente y usan sus métodos.
- Se importa `cypress-mochawesome-reporter/cucumberSupport` en cada archivo de steps.
- Los pasos usan parámetros con `{string}` para valores dinámicos.
- Los pasos se escriben en **español**.

### Tests de API
- Se usa `cy.request()` para llamadas HTTP.
- Se valida status, estructura del body y datos específicos con `expect()`.
- Para endpoints autenticados, se extrae el token del login y se usa `Authorization: Bearer`.
- Los archivos van en `cypress/e2e/tests/apiTests/`.

### Nomenclatura
- IDs de test: `TC###` (ej: TC001, TC002).
- Archivos .feature: camelCase (`purchaseFlow.feature`).
- Archivos de test: camelCase con sufijo `.cy.js` (`loginPOM.cy.js`).
- Pages: PascalCase (`LoginPage.js`).
- Step definitions: camelCase con sufijo `Steps.js` (`loginSteps.js`).

### Selectores (orden de preferencia)
1. `[formcontrolname="..."]`
2. `[aria-label="..."]`
3. `[data-testid="..."]`
4. `[placeholder="..."]`
5. `[type="..."]`
6. Evitar selectores frágiles como clases CSS o XPath.

### Idioma
- Features, descripciones de tests y comentarios en **español**.
- Nombres de variables, métodos y clases en **inglés**.

### Scripts de npm disponibles
- `cy:regression` — Features con tag @regression
- `cy:smoke` — Features con tag @smoke
- `cy:homePage` — Features con tag @homePage
- `cy:purchaseFlow` — Features con tag @purchaseFlow
- `cy:filters` — Features con tag @filters
- `cy:login` — Features con tag @login
- `cy:api` — Tests de API
- `cy:accesibilidad` — Tests de accesibilidad

## Mapeo instruction → skill (OBLIGATORIO)

> ⛔ **REGLA DE ORO — NO NEGOCIABLE.**
>
> Cuando un archivo a crear o editar coincida con un `applyTo` de la tabla, **DEBES**
> ejecutar `read_file` sobre el `SKILL.md` correspondiente **antes** de generar o
> modificar cualquier código, en cada conversación. La skill contiene la plantilla y
> el procedimiento canónicos; la instruction sólo es un resumen.
>
> Aunque la skill ya aparezca como adjunto, en `<skills>`, o creas recordarla,
> **igualmente debes leerla con `read_file` en este turno**. Saltarse este paso
> invalida el trabajo y obliga a rehacerlo.

| Path (`applyTo`)                       | Skill obligatoria        | Ruta del SKILL.md                                |
|----------------------------------------|--------------------------|--------------------------------------------------|
| `cypress/e2e/tests/apiTests/**`        | `create-api-test`        | `.github/skills/create-api-test/SKILL.md`        |
| `cypress/e2e/pages/**`                 | `create-page-object`     | `.github/skills/create-page-object/SKILL.md`     |
| `cypress/e2e/tests/features/**`        | `create-feature-file`    | `.github/skills/create-feature-file/SKILL.md`    |
| `cypress/e2e/tests/describe_test/**`   | `create-e2e-test`        | `.github/skills/create-e2e-test/SKILL.md`        |
| `.github/workflows/**`                 | `create-github-workflow` | `.github/skills/create-github-workflow/SKILL.md` |

### Procedimiento obligatorio antes de tocar un archivo de la tabla
1. Identifica el `applyTo` que matchea el path.
2. Ejecuta `read_file` sobre el `SKILL.md` indicado, leyéndolo entero.
3. Aplica su plantilla y reglas literalmente.
4. Sólo entonces genera o modifica el código.

Si te saltas el paso 2, debes detenerte, leer la skill y rehacer la respuesta.
