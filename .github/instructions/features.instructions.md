---
applyTo: "cypress/e2e/tests/features/**"
---

# Instrucciones para Features Gherkin

> ⛔ **PARADA OBLIGATORIA — NO EDITES NADA TODAVÍA.**
>
> Antes de crear, modificar o sugerir cualquier `.feature` o sus step definitions,
> **DEBES** invocar la herramienta `read_file` sobre
> `.github/skills/create-feature-file/SKILL.md` y aplicar su procedimiento al pie de la letra.
>
> No basta con recordar reglas previas ni con basarse en extractos adjuntos:
> la lectura explícita de la skill es **un paso requerido** de este flujo.
> Si saltas este paso, el trabajo se considera incorrecto y debe rehacerse.

- Escribe todos los pasos en **español**.
- Incluye tags: al menos `@regression` + un tag específico del módulo.
- Tags disponibles: `@regression`, `@smoke`, `@login`, `@purchaseFlow`, `@filters`, `@homePage`, `@negative`.
- Usa `Background` para los pasos comunes a todos los scenarios.
- Cada `Scenario` lleva un ID con formato `TC###` (ej: TC001, TC002).
- Los valores dinámicos van entre comillas: `"valor"`.
- Máximo 8-10 pasos por scenario para mantener legibilidad.
- Nombre del archivo en camelCase: `nombreFeature.feature`.
- Ubicación real de los features en este repo: `cypress/e2e/tests/features/`.
- Los step definitions correspondientes van en `cypress/e2e/step_definitions/` con sufijo `Steps.js`.
