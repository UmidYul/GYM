fetch("/getUsers", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 200 })
})
    .then(res => res.json())
    .then(dat => {
        const data = dat.members
        var name = document.getElementsByClassName("arpc_4_block_column_name")[0]
        var id = document.getElementsByClassName("arpc_4_block_column_id")[0]
        var payment = document.getElementsByClassName("arpc_4_block_column_payment")[0]
        var expire = document.getElementsByClassName("arpc_4_block_column_expire")[0]
        var edit = document.getElementsByClassName("arpc_4_block_column_edit")[0]

        name.innerHTML +=
            data.slice(-12).map(i => `
            <span class="arpc_4_block_column_text">${i.name}</span>
    `).join(" ")
        id.innerHTML +=
            data.slice(-12).map(i => `
    <span class="arpc_4_block_column_text">${i.id}</span>
`).join(" ")
        payment.innerHTML +=
            data.slice(-12).map(i => `
<span class="arpc_4_block_column_text">${i.payments[i.payments.length - 1].payment_date}</span>
`).join(" ")
        expire.innerHTML +=
            data.slice(-12).map(i => `
<span class="arpc_4_block_column_text">${i.payments[i.payments.length - 1].payment_date}</span>
`).join(" ")
        edit.innerHTML +=
            data.slice(-12).map(i => `
            <span class="arpc_4_block_column_text"><button
            class="arpc_4_block_column_btn" id='${i.id}'>Edit</button></span>
`).join(" ")
        function Search() {
            if (document.getElementById('searchInput')) {
                document.getElementById('searchInput').addEventListener('input', function () {
                    var found = false;
                    var searchQuery = this.value.trim(); // Получаем значение из поля ввода

                    name.innerHTML = `<span class="arpc_4_block_column_title">Name</span>`;
                    id.innerHTML = `<span class="arpc_4_block_column_title">Member ID</span>`;
                    payment.innerHTML = `<span class="arpc_4_block_column_title">Date Payment</span>`;
                    expire.innerHTML = ` <span class="arpc_4_block_column_title">Date Expiration</span>`;
                    edit.innerHTML = `<span class="arpc_4_block_column_title">Actions</span>`;
                    var count = 0;
                    data.forEach(function (user) {
                        if (count < 12 && String(user.id).startsWith(searchQuery)) {
                            name.innerHTML += ` <span class="arpc_4_block_column_text">${user.name}</span>`;
                            id.innerHTML += ` <span class="arpc_4_block_column_text">${user.id}</span>`;
                            payment.innerHTML += ` <span class="arpc_4_block_column_text">${user.payments[user.payments.length - 1].payment_date}</span>`;
                            expire.innerHTML += ` <span class="arpc_4_block_column_text">${user.payments[user.payments.length - 1].expire_date}</span>`;
                            edit.innerHTML += `    <span class="arpc_4_block_column_text"><button
                            class="arpc_4_block_column_btn" id='${user.id}'>Edit</button></span>`;
                            count++;
                            found = true;
                        }
                    });

                });
            }

        }
        Search()
    })