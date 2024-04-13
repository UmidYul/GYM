import { alert } from "/admin/alert.js"
fetch("/getPlans", {
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

document.getElementById("planSelect").addEventListener("click", function () {
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
            // document.getElementById('hiddenPriceInput').style.display = 'none';
            // document.getElementById('hiddenValidityInput').style.display = 'none';
            document.getElementById('hiddenPriceInput').value = document.getElementById('priceInput').value.replace(/\s/g, '');
            document.getElementById('hiddenValidityInput').value = parseInt(data.validity, 10);
            document.getElementById('hiddenPriceInput').style.display = 'block';
            document.getElementById('hiddenValidityInput').style.display = 'block';

        })



    document.getElementById('paymentBtn').addEventListener("click", function () {
        const id = document.getElementsByName("id")[0].value
        const plan = document.getElementsByName("plan")[0].value
        const date = document.getElementsByName("date")[0].value
        const price = document.getElementsByName("price")[0].value
        const validity = document.getElementsByName("validity")[0].value
        fetch("/add-payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, plan: plan, price: price, date: date, validity: validity })
        })
            .then(res => res.json())
            .then(data => {
                if (data == 200) {
                    alert("alert", 200, `
                        Оплата Пользователя ${id} Успешно Добавлена! 
                        Подробности доступны в панели Отчет.
                                                    `)
                } else {
                    alert("alert", 404, `
                        Пользователь ${id} Не Найден! 
                        Оплата Не Возможна!                           
                                                    `)
                }
            })
    })
})