document.addEventListener('DOMContentLoaded', () => {
    const ul = document.querySelector('ul');
    const pizzaDetailsContainer = document.getElementById('burger-details');
    const orderList = document.getElementById('order-list');
    const orderContainer = document.getElementById('order-container')
   
     // Function to fetch and display the list of pizzas
    const fetchPizzas = () => {
       fetch('https://phase-1-y1vc.onrender.com/pizzas')
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
    const buyerName = document.getElementById('buyer-name').value.toUpperCase();

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
    fetch('https://phase-1-y1vc.onrender.com/orders', {
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
            pizzaDetailsContainer.style.display = 'block'; 
        })
        .catch(error => console.error("Error placing order:", error));
 });

 // Function to display the order details on the page
 const displayOrder = (order) => {
    // Create a container div for the order item
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');  

    const orderIdElement = document.createElement('p');
    orderIdElement.textContent = `Order ID: ${order.id}`;
    orderItem.appendChild(orderIdElement);

    const pizzaIdElement = document.createElement('p');
    pizzaIdElement.textContent = `Pizza ID: ${order.pizzaId}`;
    orderItem.appendChild(pizzaIdElement);

    const buyerNameElement = document.createElement('p');
    buyerNameElement.textContent = `Buyer: ${order.buyerName}`;
    orderItem.appendChild(buyerNameElement);

    const statusElement = document.createElement('p');
    statusElement.textContent = `Status: ${order.status}`;
    orderItem.appendChild(statusElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Order';
    
    // Attach event listener to delete button
    deleteButton.addEventListener('click', () => {
        deleteOrder(order.id, orderItem);
    });

    // Append delete button to order item
    orderItem.appendChild(deleteButton);

    // Append the order item to the order list
    orderList.appendChild(orderItem);

    // Make sure the orders container is visible
    orderContainer.style.display = 'block'; 
};

// Updated deleteOrder function to correctly remove order from DOM
const deleteOrder = (orderId, orderItem) => {
    // Send DELETE request to server (ensure the server allows DELETE requests)
    fetch(`https://phase-1-y1vc.onrender.com/orders/${orderId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        // After successful deletion, remove the order item from the DOM
        orderItem.remove();
        alert('Order deleted successfully!');
    })
    .catch(error => {
        console.error('Error deleting order:', error);
        alert('Failed to delete the order.');
    });
};
 // Call fetchPizzas to load the pizza list when the page loads
 fetchPizzas();


 });
 