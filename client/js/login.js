
document.getElementById('login').addEventListener('click', function() {

    const clientName = document.getElementById('clientName').value;
    const password = document.getElementById('password').value;

    const loginInfo = {
        name: clientName,
        password: password
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    }).then (response => {
        if (response.ok) {
            window.location = '../html/index.html'
        } else if (response.status === 500) {
            window.alert('Error on login')
        } else if (response.status === 401) {
            window.alert('name or password incorrect')
        } else if (response.status === 404) {
            window.alert('user NOT find')
        } else if (response.status === 400) {
            window.alert('Authenticate error')
        }
    })

});

