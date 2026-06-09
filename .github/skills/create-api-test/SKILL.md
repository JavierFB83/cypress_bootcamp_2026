---
name: create-api-test
description: "Crea un test de API REST usando cy.request() con validaciones completas. Usar cuando el usuario pida crear tests de API, probar endpoints REST, o validar respuestas HTTP."
---

# Crear Test de API

## Contexto
Este proyecto usa Cypress para pruebas de API con `cy.request()`. Los tests de API se encuentran en `cypress/e2e/tests/apiTests/`.

Antes de crear un test, revisa los tests existentes en esa carpeta para mantener coherencia de estilo.

## Estructura del test de API

```javascript
describe('API - Nombre del recurso', () => {

    it('GET /endpoint - Retorna la lista de recursos', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.example.com/endpoint',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('key');
            expect(response.body.key).to.be.an('array');
        });
    });

    it('POST /endpoint - Crea un nuevo recurso', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.example.com/endpoint',
            body: { key: 'value' },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    });
});
```

## Para endpoints autenticados

```javascript
let token;

before(() => {
    cy.request({
        method: 'POST',
        url: 'URL_LOGIN',
        body: { email: '...', password: '...' }
    }).then((response) => {
        token = response.body.token;
    });
});
```

## Reglas
- Usa `cy.request()` exclusivamente (nunca `fetch()` ni `axios`).
- Valida siempre: status code, estructura del body, tipos de datos.
- Para endpoints autenticados, obtén el token con un request previo al login.
- Guarda tokens con `cy.wrap().as()` o variables `let`.
- Agrupa los tests por recurso/endpoint en el `describe`.
- Nombra los `it()` con el formato: `'MÉTODO /endpoint - Descripción'`.
- Usa `failOnStatusCode: false` solo cuando pruebes errores esperados (4xx, 5xx).
- Archivo en `cypress/e2e/tests/apiTests/` con nombre camelCase y sufijo `.cy.js`.
- Los datos de prueba se pueden externalizar en `cypress/fixtures/`.

# Preguntar al final
- Preguntame siempre al final si el flujo ha sido el adecuado o hay algo que mejorar, en ese caso indica si lo puedes mejorar tu
- Después de crear o modificar el test, pregúntame **siempre** si quiero ejecutarlo para verificar que funciona. Si respondo que sí, lánzalo con el script de npm correspondiente (`npm run cy:api` para tests de API) o con `npx cypress run --spec "<ruta_del_archivo>"` para ejecutar únicamente el archivo creado/modificado.

# Ejecución aislada con `.only` (preferencia del usuario)
- Cuando el usuario pida ejecutar **solo los tests nuevos** dentro de un archivo que contiene otros tests:
  1. Añade `.only` exclusivamente a los tests nuevos (`it.only(...)`).
  2. Si hay otros `.only` previos en el archivo, quítalos para que no se ejecuten.
  3. Lanza el spec con `npx cypress run --spec "<ruta>"`.
  4. **Después de ejecutar**, quita siempre el `.only` de los tests nuevos para devolver el archivo a su estado normal. No dejes nunca `.only` commiteable en el código.
- Si el comando `npx cypress` requiere una versión específica de Node, usa `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && npx cypress run ...` en la misma línea (la sesión de terminal no persiste `nvm use` entre llamadas).
