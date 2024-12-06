document.addEventListener('DOMContentLoaded', function() {
    const zodiakButton = document.querySelector('.money-maker-facility-add');
    const cargoButton = document.querySelector('.cargo-facility-add');
    const pecheButton = document.querySelector('.peche-facility-add');
    
    zodiakButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/buy_zodiak', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                alert('Zodiak purchased! Remaining money: ' + data.money);
                document.getElementById("polution").innerText = "Polution: " + data.polution;
                document.getElementById("inventory").innerText = "Inventory: " + JSON.stringify(data.inventory);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    cargoButton.addEventListener('click', async function() {
        try{
            const response = await fetch('/buy_cargo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                alert('Cargo purchased! Remaining money: ' + data.money);
                document.getElementById("polution").innerText = "Polution: " + data.polution;
                document.getElementById("inventory").innerText = "Inventory: " + JSON.stringify(data.inventory);

            } else {
                alert(data.error);
            }
        }catch (error){
            console.error('Error: ', error);
        }
    });

    pecheButton.addEventListener('click', async function() {
        try{
            const response = await fetch('/buy_peche', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                alert('Peche purchased! Remaining money: ' + data.money);
                document.getElementById("polution").innerText = "Polution: " + data.polution;
                document.getElementById("inventory").innerText = "Inventory: " + JSON.stringify(data.inventory);
            } else {
                alert(data.error);
            }
        }catch (error){
            console.error('Error: ', error);
        }
    });

    "Plateforme pétrolière"-Button.addEventListen('click', async function(){
        
    })
});