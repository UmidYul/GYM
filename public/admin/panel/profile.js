import { alert } from "/admin/alert.js"
const info = JSON.parse(localStorage.getItem("info"))
const change = document.getElementById("changeForm")
const reset = document.getElementById("resetPass")
const resetPass = document.getElementById("resetPassInputs")
document.getElementsByClassName("card_info")[0].innerHTML = `
<div class="card_info_row"><span>Username: </span><span>${info.name}</span></div>
<div class="card_info_row"><span>Phone :
    </span><span>${info.phone}</span></div>
<div class="card_info_row"><span>Email:
    </span><span>${info.email}</span></div>
`
document.getElementById("changeName").value = info.name
document.getElementById("changePhone").value = info.phone.slice(1)
document.getElementById("changeEmail").value = info.email

// Change Data
change.addEventListener("click", function () {
    const name = document.getElementById("changeName").value
    const phone = document.getElementById("changePhone").value
    const email = document.getElementById("changeEmail").value

    fetch("/edit-admin-data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, phone: phone, email: email })
    })
        .then(res => res.json())
        .then(dat => {
            localStorage.clear()
            localStorage.setItem("info", JSON.stringify(dat))
            window.location = "/admin#profile"
        })
})

// Reset Password
reset.addEventListener("click", function () {
    console.log(1);
    const info = JSON.parse(localStorage.getItem("info"))
    const Pass = document.getElementById("CurrentPass").value
    const newPass1 = document.getElementById("NewPass").value
    const newPass2 = document.getElementById("repeatNewPass").value

    if (Pass == info.password) {
        if (newPass1 == newPass2) {
            const form = fetch("/reset-admin-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: newPass1 })
            })
                .then(res => res.json())
                .then(dat => {
                    localStorage.clear()
                    localStorage.setItem("info", JSON.stringify(dat))
                    window.location = "/admin#profile"
                })
        } else {
            alert("alert", 404, `Пароли Не Совпадают!
                Пожалуйста Проверьте И Введите Его Заново.`)
        }
    } else {
        alert("alert", 404, `Вы Ввели НеПравильный Нынешний Пароль! 
        Пожалуйста Проверьте И Введите Его Заново.`)
    }
})

// Reset Inputs
resetPass.addEventListener("click", function () {
    console.log(2);
    document.getElementById("CurrentPass").value = ""
    document.getElementById("NewPass").value = ""
    document.getElementById("repeatNewPass").value = ""
})