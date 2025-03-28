document.addEventListener('DOMContentLoaded', () => {
    const ul = document.querySelector('ul');
    const pizzaDetailsContainer = document.getElementById('burger-details');
    const orderList = document.getElementById('order-list');
    const orderContainer = document.getElementById('order-container')
   
     // Function to fetch and display the list of pizzas
    const fetchPizzas = () => {
       fetch('http://localhost:3000/pizzas')
           .then(response => response.json())
           .then(data => {
               data.forEach(pizza => {
                   const li = document.createElement('li');
                   li.setAttribute('data-id', pizza.id); 
                   li.textContent = pizza.name; 
                   ul.appendChild(li);
   
                   // Add event listener to each pizza item
                   li.addEventListener('click', () => {
                       showPizzaDetails(pizza);
                   });
               });
           })
           .catch(error => console.error("Error fetching pizzas:", error));
    };
 
  // Function to fetch and display the details of a selected pizza
 const showPizzaDetails = (pizza) => {
    document.getElementById('pizza-quantity').textContent = `Quantity Available: ${pizza.quantity}`;
    document.getElementById('pizza-description').textContent = `Description: ${pizza.description}`;
    document.getElementById('pizza-price').textContent = `Price: $${pizza.price}`;
   document.getElementById('pizza').src = pizza.img; // Set the pizza image

    // Show the details container
    pizzaDetailsContainer.style.display = 'block';

    // Set the pizza ID on the "Make Order" button
    const buyButton = document.getElementById('Buy');
    buyButton.setAttribute('data-pizza-id', pizza.id);
 }
 // Function to place an order
 document.getElementById('Buy').addEventListener('click', () => {
    const pizzaId = document.getElementById('Buy').getAttribute('data-pizza-id');
    const buyerName = document.getElementById('buyer-name').value;

    if (!buyerName) {
        alert('Please enter your name.');
        return;
    }
    

    const order = {
        pizzaId: pizzaId,
        buyerName: buyerName,
        status: 'completed' 
    };

    // Send order to server
    fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
        .then(response => response.json())
        .then(data => {
            alert(`Order placed successfully! Order ID: ${data.id}`);

            // Show the order details
            displayOrder(data);

            // Clear the name input
            document.getElementById('buyer-name').value = '';
            pizzaDetailsContainer.style.display = 'none'; 
        })
        .catch(error => console.error("Error placing order:", error));
 });

 // Function to display the order details on the page
 const displayOrder = (order) => {

    

    // Create a container div for the order item
    const orderItem = document.createElement('div');
    
    
    const orderIdElement = document.createElement('p');
    orderIdElement.textContent = `Order ID: ${order.id}`;
    orderContainer.appendChild(orderIdElement);

    const pizzaIdElement = document.createElement('p');
    pizzaIdElement.textContent = `Pizza ID: ${order.pizzaId}`;
    orderContainer.appendChild(pizzaIdElement);

    const buyerNameElement = document.createElement('p');
    buyerNameElement.textContent = `Buyer: ${order.buyerName}`;
    orderContainer.appendChild(buyerNameElement);

    const statusElement = document.createElement('p');
    statusElement.textContent = `Status: ${order.status}`;
    orderContainer.appendChild(statusElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Order';
    deleteButton.addEventListener('click', () => {
        deleteOrder(order.id, orderContainer); 
    });
    orderItem.appendChild(deleteButton);

    
   
    orderList.appendChild(orderItem);

   
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.style.display = 'block'; 
 };

 });
 