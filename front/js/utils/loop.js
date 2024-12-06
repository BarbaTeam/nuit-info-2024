import { getInventory } from './inventory.js'; 


function checkFacilities() {
    const inventory = getInventory();
    const alertContainer = document.querySelector('.alert-screen');

    alertContainer.innerHTML = '';

    if (inventory.zodiak > 0) {
        const alert = document.createElement('div');
        alert.innerText = `Zodiak Alert: You have ${inventory.zodiak} Zodiak(s)`;
        alert.style.color = 'black';
        alertContainer.appendChild(alert);
    }

    if (inventory.cargo > 0) {
        const alert = document.createElement('div');
        alert.innerText = `Cargo Alert: You have ${inventory.cargo} Cargo(s)`;
        alert.style.color = 'black';
        alertContainer.appendChild(alert);
    }

    if (inventory.peche > 0) {
        const alert = document.createElement('div');
        alert.innerText = `Peche Alert: You have ${inventory.peche} Peche(s)`;
        alert.style.color = 'black';
        alertContainer.appendChild(alert);
    }

}

setInterval(checkFacilities, 120000);