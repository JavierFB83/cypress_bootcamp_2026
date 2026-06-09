describe('API GET Footer Products & Cart', () => {
	it('GET /api/products/ - Lista todos los productos', () => {
		cy.request('https://footer-back.onrender.com/api/products/').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array');
			expect(response.body).to.have.property('totalPages', 10);

			// Aserción: comprobar el totalStock de un producto concreto por nombre
			const productoBuscado = response.body.products.find(p => p.name === 'Nike Apex Bucket');
			expect(productoBuscado).to.exist;
			expect(productoBuscado.totalStock).to.eq(0);

			// Aserción: guardar productos con totalStock 0 (name e id)
			const productosSinStock = response.body.products.filter(p => p.totalStock === 0);
			if (productosSinStock.length > 0) {
				const sinStockInfo = productosSinStock.map(p => ({ id: p.id, name: p.name }));
				cy.log('Productos sin stock:', JSON.stringify(sinStockInfo));
			}
		});
	});

	it('GET /api/products?page=1 - Productos paginados', () => {
		cy.request('https://footer-back.onrender.com/api/products?page=1').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array');
			expect(response.body).to.have.property('currentPage', 1);
			expect(response.body.currentPage).to.eq(1);
		});
	});

	it('GET /api/products?category=zapatillas - Productos zapatillas', () => {
		cy.request('https://footer-back.onrender.com/api/products?category=zapatillas').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array');
			if (response.body.products.length > 0) {
				expect(response.body.products[0].category).to.eq('zapatillas');
			}
		});
	});

	it('GET /api/products?category=ropa - Productos ropa', () => {
		cy.request('https://footer-back.onrender.com/api/products?category=ropa').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array');
			if (response.body.products.length > 0) {
				expect(response.body.products[0].category).to.eq('ropa');
			}
		});
	});

	it('GET /api/products?category=complementos - Productos complementos', () => {
		cy.request('https://footer-back.onrender.com/api/products?category=complementos').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array');
			if (response.body.products.length > 0) {
				expect(response.body.products[0].category).to.eq('complementos');
			}
		});
	});

	it('GET /api/products/141 - Producto específico', () => {
		cy.request('https://footer-back.onrender.com/api/products/141').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('id');
			expect(response.body.id).to.eq(141);
			expect(response.body).to.have.property('name', 'Nike Club Fleece');
		});
	});

	it('GET /api/products/141/related - Productos relacionados', () => {
		cy.request('https://footer-back.onrender.com/api/products/141/related').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.be.an('array');
		});
	});

	it('GET /api/products?name=Nike - Filtrar productos por nombre', () => {
		const searchTerm = 'Nike';
		cy.request(`https://footer-back.onrender.com/api/products?name=${searchTerm}`).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array').and.not.empty;

			// Aserción: todos los productos devueltos contienen el término buscado en el nombre
			response.body.products.forEach((product) => {
				expect(product).to.have.property('name');
				expect(product.name.toLowerCase()).to.include(searchTerm.toLowerCase());
			});
			cy.log(`Productos encontrados con "${searchTerm}": ${response.body.products.length}`);
		});
	});

	it('GET /api/products/999999 - Producto inexistente devuelve 404', () => {
		cy.request({
			method: 'GET',
			url: 'https://footer-back.onrender.com/api/products/999999',
			failOnStatusCode: false,
		}).then((response) => {
			expect(response.status).to.eq(404);
			expect(response.body).to.be.an('object');
			// Aserción: el body contiene un mensaje de error
			expect(response.body).to.satisfy(
				(body) => body.hasOwnProperty('message') || body.hasOwnProperty('error'),
				'El body debe contener una propiedad "message" o "error"'
			);
		});
	});

	it('GET /api/cart - Obtener carrito', () => {

        cy.fixture('login_form').then((loginData) => {
            cy.request('POST', 'https://footer-back.onrender.com/api/auth/login', {
                email: loginData.email,
                password: loginData.password,
            }).then((loginResponse) => {
                expect(loginResponse.status).to.eq(200);
                expect(loginResponse.body).to.have.property('token');
                // Guardamos el token como alias para usarlo en los tests
                cy.wrap(loginResponse.body.token).as('eltokendemisesion');
            });
        });
 		cy.get('@eltokendemisesion').then((token) => { 
		cy.request({
			method: 'GET',
			url: 'https://footer-back.onrender.com/api/cart',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}).then((response) => {
			expect(response.status).to.eq(200);
			// expect(response.body).to.have.property('cart');
			expect(response.body).to.be.an('array');
		});
	});
	});

	it('GET /api/products?page=10 - Última página devuelve currentPage correcto', () => {
		cy.request('https://footer-back.onrender.com/api/products?page=10').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array');
			expect(response.body).to.have.property('currentPage', 10);
			expect(response.body).to.have.property('totalPages', 10);

			// Aserción: todos los productos de la página tienen las propiedades básicas
			response.body.products.forEach((product) => {
				expect(product).to.have.property('id').that.is.a('number');
				expect(product).to.have.property('name').that.is.a('string');
				expect(product).to.have.property('category').that.is.a('string');
			});
			cy.log(`Productos en la última página: ${response.body.products.length}`);
		});
	});

	it('GET /api/products?name=NoExisteProducto123 - Búsqueda sin resultados devuelve array vacío', () => {
		const searchTerm = 'NoExisteProducto123';
		cy.request(`https://footer-back.onrender.com/api/products?name=${searchTerm}`).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('products');
			expect(response.body.products).to.be.an('array').that.is.empty;
			cy.log(`Sin resultados para el término: "${searchTerm}"`);
		});
	});
});
