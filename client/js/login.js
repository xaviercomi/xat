
document.getElementById('login').addEventListener('click', function() {

    const clientName = document.getElementById('clientName');
    const password = document.getElementById('password')

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: clientName,
            password: password
        })
    }).then ()

});

