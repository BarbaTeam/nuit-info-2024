document.addEventListener('DOMContentLoaded', function() {
    const zodiakButton = document.querySelector('.money-maker-facility-add');
    const cargoButton = document.querySelector('.cargo-facility-add');
    
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
            } else {
                alert(data.error);
            }
        }catch (error){
            console.error('Eror: ', error);
        }
    });
    
});