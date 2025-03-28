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
 })
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
 };
 