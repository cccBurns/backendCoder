const socket = io();


        socket.on('productList', function(products) {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            products.forEach(function(product) {
            const li = document.createElement('li');
            li.innerText = product.title + ' - ' + product.description + '-' +  product.price + '-' + product.category
            productList.appendChild(li);
            });
        });

        document.getElementById('product-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementsByName('title')[0].value;
            const description = document.getElementsByName('description')[0].value;
            const price = document.getElementsByName('price')[0].value;
            const category = document.getElementsByName('category')[0].value;


            socket.emit('addProduct', { name: title,description: description ,price: price, category: category });
        });