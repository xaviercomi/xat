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
    }).then (response => response.json())
      .then (data => {
            localStorage.setItem("token", JSON.stringify(data.token));
            window.location = '../html/index.html'
    }).catch (data => { 
        window.alert('credential NOT allowed')
    });

});

