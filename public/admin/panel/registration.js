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
    document.getElementById("planSelect").addEventListener("change", function () {
     fetch("/price", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ plan: document.getElementById("planSelect").value })
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("priceInput").value = data.text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                document.getElementById('registerFormBtn').addEventListener('click', function () {
                    // document.getElementById('hiddenPriceInput').style.display = 'none';
                    // document.getElementById('hiddenValidityInput').style.display = 'none';
                    document.getElementById('hiddenPriceInput').value = document.getElementById('priceInput').value.replace(/\s/g, '');
                    document.getElementById('hiddenValidityInput').value = data.validity
                    document.getElementById('hiddenPriceInput').style.display = 'block';
                    document.getElementById('hiddenValidityInput').style.display = 'block';
fetch("/register", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
         name: document.getElementById("nameInp").value,
         email: document.getElementById("email").value,
         password: document.getElementById("pass").value,
         phone: document.getElementById("phone").value,
         plan: document.getElementById("planSelect").value,
         price: document.getElementById("hiddenPriceInput").value,
         validity: document.getElementById("hiddenValidityInput").value,
         dateofjoin: document.getElementById("date").value        
        })
})
    .then(res => res.json())
    .then(data => {
document.getElementsByClassName('admin_right_panel_content')[0].innerHTML = `
<div class="arpc_3 ">
<h1 class="arpc_3_subtitle">Become a Member!</h1>
<h1 class="arpc_3_title">Registered</h1>
<div class="arpc_3_block">
    <div class="arpc_3_block_row">
        <h1 class="h1_row">ID: <span>${data.id}</span></h1>
        <h1 class="h1_row">Name: <span>${data.name}</span></h1>
        <h1 class="h1_row">Email: <span>${data.email}</span></h1>
        <h1 class="h1_row">Password: <span>${data.password}</span></h1>
        <h1 class="h1_row">Plan: <span>${data.plan}</span></h1>
        <h1 class="h1_row">Price: <span>${data.price}</span></h1>
        <h1 class="h1_row">Date Of Join: <span>${data.dateofjoin}</span></h1>
    </div>
    <button id="okBtn" class="arpc_3_block_btn">OK</button>
</div>
</div>
`
document.getElementById("okBtn").addEventListener("click",()=>{
    window.location ="/admin#registration"
})
    })
                });
            })
        })
