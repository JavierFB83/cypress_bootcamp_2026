@regression @login @negative
Feature: Casos negativos del login

  Background:
    Given el usuario está en la página de login
    And el botón de Google es visible con texto "Continuar con Google"

  Scenario: TC001 - Botón de submit deshabilitado con ambos campos vacíos
    Then el campo email tiene placeholder "tu.email@ejemplo.com" y está vacío
    And el campo password tiene placeholder "Introduce tu contraseña" y está vacío
    And el botón de submit está deshabilitado
    And el icono de perfil no existe
    And el icono de cerrar sesión no existe

  Scenario: TC002 - Botón de submit deshabilitado con solo email relleno
    When el usuario escribe el email "cypress_bootcamp_2026@javi.com"
    Then el campo email tiene el valor "cypress_bootcamp_2026@javi.com"
    And el campo password tiene placeholder "Introduce tu contraseña" y está vacío
    And el botón de submit está deshabilitado

  Scenario: TC003 - Botón de submit deshabilitado con solo contraseña rellena
    When el usuario escribe la contraseña "1234Javi."
    Then el campo password tiene el valor "1234Javi."
    And el campo email tiene placeholder "tu.email@ejemplo.com" y está vacío
    And el botón de submit está deshabilitado

  Scenario: TC004 - Login con email de formato inválido (sin arroba)
    When el usuario escribe el email "correo-sin-arroba"
    And el usuario escribe la contraseña "1234Javi."
    Then el botón de submit está deshabilitado
    And el icono de perfil no existe

  @smoke
  Scenario: TC005 - Login con email y contraseña incorrectos
    When el usuario escribe el email "noexiste@javi.com"
    And el usuario escribe la contraseña "claveIncorrecta123"
    And el usuario hace clic en el botón de login
    Then el botón de submit muestra "Accediendo..." y está deshabilitado
    And aparece el toast "Credenciales inválidas"
    And el toast desaparece
    And el icono de perfil no existe
    And el icono de cerrar sesión no existe

  Scenario: TC006 - Login con intento de inyección SQL en email y contraseña
    When el usuario escribe el email "' OR '1'='1"
    And el usuario escribe la contraseña "' OR '1'='1"
    And el usuario hace clic en el botón de login
    Then aparece el toast "Credenciales inválidas"
    And el toast desaparece
    And el icono de perfil no existe

  Scenario: TC007 - Login con intento de XSS en el campo email
    When el usuario escribe el email "<script>alert(1)</script>@javi.com"
    And el usuario escribe la contraseña "1234Javi."
    And el usuario hace clic en el botón de login
    Then aparece el toast "Credenciales inválidas"
    And el toast desaparece
    And la página no contiene el texto "alert(1)"

  Scenario: TC008 - Login con contraseña demasiado corta
    When el usuario escribe el email "cypress_bootcamp_2026@javi.com"
    And el usuario escribe la contraseña "123"
    And el usuario hace clic en el botón de login
    Then aparece el toast "Credenciales inválidas"
    And el toast desaparece
    And el icono de perfil no existe
