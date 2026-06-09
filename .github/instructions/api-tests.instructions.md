---
applyTo: "cypress/e2e/tests/apiTests/**"
---

# Instrucciones para Tests de API

> ⛔ **PARADA OBLIGATORIA — NO EDITES NADA TODAVÍA.**
>
> Antes de crear, modificar o sugerir cualquier test en este directorio,
> **DEBES** invocar la herramienta `read_file` sobre
> `.github/skills/create-api-test/SKILL.md` y aplicar su procedimiento al pie de la letra.
>
> No basta con recordar reglas previas ni con basarse en extractos adjuntos:
> la lectura explícita de la skill es **un paso requerido** de este flujo.
> Si saltas este paso, el trabajo se considera incorrecto y debe rehacerse.

- Usa `cy.request()` exclusivamente para llamadas HTTP.
- Valida siempre: status code, estructura del body y tipos de datos.
- Nombra los `it()` con el formato: `'MÉTODO /endpoint - Descripción'`.
- Para autenticación, extrae el token en `before()` o `beforeEach()`.
- Agrupa tests por recurso/endpoint en un solo `describe`.
- Usa `failOnStatusCode: false` solo para probar errores esperados (4xx, 5xx).
- Los datos de prueba se pueden externalizar en `cypress/fixtures/`.
- Comentarios y descripciones en español. Variables y métodos en inglés.
