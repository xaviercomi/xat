
document.getElementById('register').addEventListener('click', function() {

    const clientName = document.getElementById('clientName');
    const password = document.getElementById('password')

    var info = {
        name: clientName,
        password: password
    }

    console.log("s'ha enviat la info " + info);

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: info
    }).then(response => console.log(response.json()))
      .then(status => {
        if (status.status === 200) {
            window.alert(response)
            window.location = '../html/login.html';
        }
    })
    
});

 