
document.getElementById('register').addEventListener('click', function() {

    const clientName = document.getElementById('clientName').value;
    const password = document.getElementById('password').value;

    const info = {
        name: clientName,
        password: password
    };

    fetch('http://localhost:3000/register', {
        method: "POST",
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify(info)
    }).then(response => {
        if (response.ok) {
            window.alert('User registered!')
            window.location = '../html/login.html';
        } else {
            window.alert('User already exists, log in')
            window.location = '../html/login.html'
        }
    })
    
});

 