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