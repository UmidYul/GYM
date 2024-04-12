const response = fetch("/getPlans", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 200 })
})
    .then(res => res.json())
    .then(dat => {
        document.getElementById("planSelect").innerHTML += dat.obj.map(i => `
<option value="${i.name}">${i.name}</option>
`)
    })

function planFunc(value) {
    const response = fetch("/price", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan: value })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("priceInput").value = data.text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            document.getElementById('registerForm').addEventListener('submit', function (event) {
                event.preventDefault();
                // document.getElementById('hiddenPriceInput').style.display = 'none';
                // document.getElementById('hiddenValidityInput').style.display = 'none';
                document.getElementById('hiddenPriceInput').value = document.getElementById('priceInput').value.replace(/\s/g, '');
                document.getElementById('hiddenValidityInput').value = data.validity
                document.getElementById('hiddenPriceInput').style.display = 'block';
                document.getElementById('hiddenValidityInput').style.display = 'block';
                console.log(document.getElementById('hiddenValidityInput').value, document.getElementById('hiddenPriceInput').value);
                this.submit()
            });
        })
}