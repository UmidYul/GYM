fetch("/getCoaches", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 200 })
})
    .then(res => res.json())
    .then(dat => {
        const data = dat.coaches
        var name = document.getElementsByClassName("arpc_4_block_column_name")[0]
        var id = document.getElementsByClassName("arpc_4_block_column_id")[0]
        var phone = document.getElementsByClassName("arpc_4_block_column_phone")[0]
        var date = document.getElementsByClassName("arpc_4_block_column_date")[0]
        var edit = document.getElementsByClassName("arpc_4_block_column_edit")[0]

        name.innerHTML += data.slice(-12).map(i => `<span class="arpc_4_block_column_text">${i.name}</span>`).join(" ")
        id.innerHTML += data.slice(-12).map(i => `<span class="arpc_4_block_column_text">${(i.dateofwork).join(" / ")}</span>`).join(" ")
        phone.innerHTML += data.slice(-12).map(i => `<span class="arpc_4_block_column_text">${i.phone}</span>`).join(" ")
        date.innerHTML += data.slice(-12).map(i => `<span class="arpc_4_block_column_text">${i.dateofjoin}</span>`).join(" ")
        edit.innerHTML += data.slice(-12).map(i => `
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
                        if (count < 5 && String(user.id).startsWith(searchQuery)) {
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

document.getElementById("coachBtn").addEventListener("click", () => {
    document.getElementById("formField").innerHTML = ` 
        <form method="POST"  action="/add-coaches" class="arpc_3_block" id="coachForm">
            <form id="registerForm" class="arpc_3_block_form">
                <div class="arpc_3_block_form_row_1">
                    <div class="arpc_3_block_form_row_1_group_1">
                        <h1 class="row_1_h1">Name of Coach</h1>
                        <input type="text" id="nameInp" required name="name" class="row_1_input">
                    </div>
                    <div class="arpc_3_block_form_row_1_group_2">
                        <h1 class="row_1_h1">Date of Join</h1>
                        <input type="date" id="date" required name="dateofjoin" class="row_1_input">
                    </div>
                </div>
                <div class="arpc_3_block_form_row_2">
                    <div class="arpc_3_block_form_row_2_group_1">
                        <h1 class="row_2_h1">Email Address</h1>
                        <input type="text" id="email" required name="email" class="row_2_input">
                    </div>
                    <div class="arpc_3_block_form_row_2_group_2">
                        <h1 class="row_2_h1">Phone</h1>
                        <input type="number" id="phone" required name="phone" class="row_2_input">
                    </div>
                </div>
                <h1 class="coach_available_days_title">Available Days</h1>
                <div class="coach_available_days">
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Mon">Mon
                    </div>
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Tue">Tue
                    </div>
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Wed">Wed
                    </div>
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Thu">Thu
                    </div>
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Fri">Fri
                    </div>
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Sat">Sat
                    </div>
                    <div class="coach_available_days_row">
                        <input type="checkbox" name="weekday" value="Sun">Sun
                    </div>
                </div>
                <div class="form_buttons arpc_3_block_form_btn_1">
                    <button id="registerFormBtn" type="submit" class="form_button_save btn">Save</button>
                    <button id="CancelFormBtn" class="form_button_save btn">Cancel</button>
                </div>
            </form>`
    document.getElementById("CancelFormBtn").addEventListener("click", () => {
        window.location = "/admin#coaches"
    })
    // document.getElementById("registerFormBtn").addEventListener("click", () => {
    //     const name = document.getElementById("nameInp").value
    //     const date = document.getElementById("date").value
    //     const email = document.getElementById("email").value
    //     const phone = document.getElementById("phone").value
    //     var checkboxes = document.querySelectorAll('input[name="weekday"]');
    //     var values = [];
    //     checkboxes.forEach(function (checkbox) {
    //         values.push(checkbox.value);
    //     });
    //     console.log(values);
    //     fetch("/add-coaches", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ name: name, date: date, email: email, phone: phone, weekday: values })
    //     })
    //         .then(res => res.json())
    //         .then(dat => {
    //             console.log(dat);
    //         }).catch(err => console.log(err))
    // })
})