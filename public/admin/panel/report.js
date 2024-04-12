fetch("/getPayments", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 200 })
})
    .then(res => res.json())
    .then(dat => {
        const members = dat.members
        const data = dat.members
        var name = document.getElementsByClassName("arpc_4_block_column_name")[0]
        var id = document.getElementsByClassName("arpc_4_block_column_id")[0]
        var plan = document.getElementsByClassName("arpc_4_block_column_plan")[0]
        var price = document.getElementsByClassName("arpc_4_block_column_price")[0]
        var paid = document.getElementsByClassName("arpc_4_block_column_paid")[0]
        const allPayments = members.reduce((acc, member) => acc.concat(member.payments), []);
        function sortByPaymentDate(a, b) {
            return new Date(b.payment_date) - new Date(a.payment_date);
        }
        allPayments.sort(sortByPaymentDate);
        allPayments.slice(0, 10).forEach(payment => {
            const member = members.find(member => member.payments.includes(payment));
            name.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text">${member.name}</span>`
            id.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text">${member.id}</span>`
            plan.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text">${payment.plan}</span>`
            price.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text"> ${payment.price}</span>`
            paid.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text"> ${payment.payment_date}</span>`
        });

        function Search() {
            if (document.getElementById('searchInput')) {
                document.getElementById('searchInput').addEventListener('input', function () {
                    var found = false;
                    var searchQuery = this.value.trim(); // Получаем значение из поля ввода

                    name.innerHTML = ` <span class="arpc_4_block_column_title arpc_8_text">Name</span>`
                    id.innerHTML = `<span class="arpc_4_block_column_title arpc_8_text">ID</span>`
                    plan.innerHTML = `<span class="arpc_4_block_column_title arpc_8_text">Plan</span>`
                    price.innerHTML = ` <span class="arpc_4_block_column_title arpc_8_text">Price</span>`
                    paid.innerHTML = ` <span class="arpc_4_block_column_title arpc_8_text">Date Paid</span>`
                    const allPayments = members.reduce((acc, member) => acc.concat(member.payments), []);
                    function sortByPaymentDate(a, b) {
                        return new Date(b.payment_date) - new Date(a.payment_date);
                    }
                    allPayments.sort(sortByPaymentDate);
                    allPayments.slice(0, 10).forEach(payment => {
                        const member = members.find(member => member.payments.includes(payment));
                        if (String(member.id).startsWith(searchQuery)) {
                            name.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text">${member.name}</span>`
                            id.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text">${member.id}</span>`
                            plan.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text">${payment.plan}</span>`
                            price.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text"> ${payment.price}</span>`
                            paid.innerHTML += `<span class="arpc_4_block_column_text arpc_8_text"> ${payment.payment_date}</span>`
                            found = true;
                        }
                    });


                });
            }

        }
        Search()
    })