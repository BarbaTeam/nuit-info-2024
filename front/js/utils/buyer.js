document.addEventListener('DOMContentLoaded', function() {
    const zodiakButton = document.querySelector('.money-maker-facility-add');
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
});