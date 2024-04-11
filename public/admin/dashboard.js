console.log(200);
setTimeout(() => {
    const info = JSON.parse(localStorage.getItem("info"))
    document.getElementsByClassName("profile_name")[0].textContent = info.name
    document.getElementsByClassName("profile_email")[0].textContent = "ID: " + info.id
    document.getElementsByClassName("arpc_1_row_1_block_1_left_side_title")[0].innerHTML = `Welcome
    <span>${info.name}</span>`

    const users = fetch("/getUsers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 200 })
    })
        .then(res => res.json())
        .then(dat => {
            const data = dat.members
            if (document.getElementsByClassName("arpc_1_row_3_block_4_list_name")[0]) {
                document.getElementsByClassName("arpc_1_row_3_block_4_list_name")[0].innerHTML +=
                    dat.members.slice(-5).map(i => `
        <div class="arpc_1_row_3_block_4_list_name_row">
            <div class="arpc_1_row_3_block_4_list_name_row_name">${i.name}</div>
        </div>
        `).join(" ")
            }
            if (document.getElementsByClassName("table_dates")[0]) {
                document.getElementsByClassName("table_dates")[0].innerHTML +=
                    dat.members.slice(-5).map(i => `
        <div class="arpc_1_row_3_block_4_list_date_table_dates">
            <div class="arpc_1_row_3_block_4_list_date_table_paid">1${i.payments[i.payments.length - 1].payment_date}</div>
            <div class="arpc_1_row_3_block_4_list_date_table_expiry">${i.payments[i.payments.length - 1].expire_date}</div>
            <div class="arpc_1_row_3_block_4_list_date_table_status">${i.status}</div>
        </div>
        `).join(" ")
            }
            function Search() {
                if (document.getElementById('searchInput')) {
                    document.getElementById('searchInput').addEventListener('input', function () {
                        var found = false;
                        var searchQuery = this.value.trim(); // Получаем значение из поля ввода
                        var resultsContainer1 = document.getElementsByClassName("arpc_1_row_3_block_4_list_name")[0]
                        var resultsContainer2 = document.getElementsByClassName("table_dates")[0]
                        resultsContainer1.innerHTML = ` <div class="arpc_1_row_3_block_4_list_name_row">
            <div class="arpc_1_row_3_block_4_list_name_row_name">&nbsp;
            </div>
        </div>`;
                        resultsContainer2.innerHTML = '';
                        var count = 0;
                        data.forEach(function (user) {
                            if (count < 5 && String(user.id).startsWith(searchQuery)) {
                                resultsContainer1.innerHTML += ` <div
            class="arpc_1_row_3_block_4_list_name_row">
            <div class="arpc_1_row_3_block_4_list_name_row_name">${user.name}</div>
            </div>
            `;
                                resultsContainer2.innerHTML += `
            <div class="arpc_1_row_3_block_4_list_date_table_dates">
                <div class="arpc_1_row_3_block_4_list_date_table_paid">${user.payments[user.payments.length - 1].payment_date}
                </div>
                <div class="arpc_1_row_3_block_4_list_date_table_expiry">${user.payments[user.payments.length - 1].expire_date}
                </div>
                <div class="arpc_1_row_3_block_4_list_date_table_status">${user.status}</div>
            </div>
            `;
                                count++;
                                found = true;
                            }
                        });
                        if (!found) {
                            setTimeout(() => {
                                resultsContainer2.innerHTML += `
            <div class="arpc_1_row_3_block_4_list_date_table_dates">
                <div class="arpc_1_row_3_block_4_list_date_table_paid">Пользователь Не Найден!</div>
            </div>
            `
                            }, 100);
                        }
                    });
                }

            }
            function statistic() {
                const perDiv = document.getElementsByClassName("arpc_1_row_2_block_2_percentage")[0]
                var totalUsers = data.length;
                var activeUsers = data.filter(function (user) {
                    return user.status === 'Active';
                }).length;
                var activeUsersPercentage = Math.round((activeUsers / totalUsers) * 100);
                perDiv.textContent = activeUsersPercentage + "%"
            }
            Search()
            statistic()
        })
}, 50);