Feature: Flujo de Compra


  Background:
    Given el usuario inicia sesión con "cypress_bootcamp_2026@javi.com" y "1234Javi."
    And el toast de login exitoso aparece y desaparece

  @smoke @TC001
  Scenario: TC001 - Añadir zapatilla, ropa y complemento al carrito y verificar el resumen
    # Zapatilla
    When el usuario busca y selecciona el producto "Nike Air Force 1"
    Then el título del producto es "Nike Air Force 1"
    When el usuario selecciona la talla "40"
    And el usuario añade el producto al carrito
    Then aparece el toast "¡Producto añadido a la cesta!"
    And el toast desaparece

    # Ropa
    When el usuario busca y selecciona el producto "Nike Tech Fleece"
    Then el título del producto es "Nike Tech Fleece"
    When el usuario selecciona la talla "M"
    And el usuario añade el producto al carrito
    Then aparece el toast "¡Producto añadido a la cesta!"
    And el toast desaparece

    # Complemento
    When el usuario busca y selecciona el producto "New Era 9Forty"
    Then el título del producto es "New Era 9Forty"
    When el usuario selecciona la talla "Talla Única"
    And el usuario añade el producto al carrito
    Then aparece el toast "¡Producto añadido a la cesta!"
    And el toast desaparece

    # Verificar carrito
    When el usuario va al carrito
    Then la URL contiene "/cart"
    And el título de la página es "Mi Cesta de la Compra"
    And el producto "Nike Air Force 1" está en el carrito
    And el producto "Nike Tech Fleece" está en el carrito
    And el producto "New Era 9Forty" está en el carrito
    And el resumen del pedido es visible
    And se muestra "Base Imponible"
    And se muestra "IVA (21%)"
    And se muestra "Total"

    # Limpiar carrito
    Then hay 3 botones de eliminar producto
    When el usuario elimina el primer producto del carrito
    And el usuario elimina el primer producto del carrito
    And el usuario elimina el primer producto del carrito
    Then el carrito está vacío

  @smoke @TC002
  Scenario: TC002 - Modificar cantidad de un producto en el carrito
    When el usuario busca y selecciona el producto "Nike Air Force 1"
    Then el título del producto es "Nike Air Force 1"
    When el usuario selecciona la talla "42"
    And el usuario añade el producto al carrito
    Then aparece el toast "¡Producto añadido a la cesta!"
    And el toast desaparece

    When el usuario va al carrito
    Then la URL contiene "/cart"
    And el producto "Nike Air Force 1" está en el carrito

    When el usuario aumenta la cantidad del producto
    And el usuario aumenta la cantidad del producto
    And el usuario reduce la cantidad del producto

    # Limpiar
    When el usuario elimina el primer producto del carrito
    Then el carrito está vacío

  @smoke @TC003
  Scenario: TC003 - Verificar que sin dirección no se puede pagar
    When el usuario busca y selecciona el producto "New Era 9Forty"
    Then el título del producto es "New Era 9Forty"
    When el usuario selecciona la talla "Talla Única"
    And el usuario añade el producto al carrito
    Then aparece el toast "¡Producto añadido a la cesta!"
    And el toast desaparece

    When el usuario va al carrito
    Then la URL contiene "/cart"
    And el botón "Pagar de forma segura" está deshabilitado
    And se muestra "Debes seleccionar una dirección de envío para continuar."
    And la opción de envío "Estándar (48/72h)" es visible
    And la opción de envío "Express (24h)" es visible

    # Limpiar
    When el usuario elimina el primer producto del carrito
    Then el carrito está vacío
