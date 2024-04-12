import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from "body-parser";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import cron from "node-cron"
import { SendEmail } from "./email.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const defaultData = { admin: [], members: [], plans: [], coaches: [] }
const db = new Low(adapter, defaultData)
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/main.html")
})

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/views/admin.html")
})
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
})
app.post("/login", async (req, res) => {
    await db.read()
    const { email, password, ip, date } = req.body
    const { members, admin } = db.data
    if (email == admin.email) {
        if (password == admin.password) {
            res.send(JSON.stringify({
                id: admin.id,
                name: admin.name,
                email: admin.email,
                password: admin.password,
                phone: admin.phone,
                access: true,
                status: 200

            }))
            SendEmail(admin.email, "Уведомление о входе в аккаунт!", `
                    Здравствуйте ${admin.name},
                    
                    Мы обращаемся к вам, чтобы уведомить о том, что недавно произошел вход в ваш аккаунт ${admin.email}. 
                    
                    Время входа: ${date}
                    IP-адрес входа: ${ip}
                    
                    Если вы не совершали это действие, немедленно выполните следующие шаги:
                    
                    1. Измените пароль аккаунта.
                    2. Свяжитесь с нами, если у вас возникли какие-либо вопросы или подозрения на несанкционированный доступ к вашему аккаунту.
                    
                    С уважением,
                    Stamina Fitness
                    `)
        }
    }
    else {
        function findIndexByEmail(email, members) {
            for (let i = 0; i < members.length; i++) {
                if (members[i].email === email) {
                    return i;
                }
            }
            return -1;
        }

        const emailToFind = email;
        const index = findIndexByEmail(emailToFind, members);
        if (index !== -1) {
            if (members[index].email == email) {
                if (members[index].password == password) {
                    res.send(JSON.stringify({
                        status: 200,
                        access: false,
                        name: members[index].name,
                        info: members[index]
                    }))
                    SendEmail(members[index].email, "Уведомление о входе в аккаунт!", `
                    Здравствуйте ${members[index].name},
                    
                    Мы обращаемся к вам, чтобы уведомить о том, что недавно произошел вход в ваш аккаунт ${members[index].email}. 
                    
                    Время входа: ${date}
                    IP-адрес входа: ${ip}
                    
                    Если вы не совершали это действие, немедленно выполните следующие шаги:
                    
                    1. Измените пароль аккаунта.
                    2. Свяжитесь с нами, если у вас возникли какие-либо вопросы или подозрения на несанкционированный доступ к вашему аккаунту.
                    
                    С уважением,
                    Stamina Fitness
                    `)
                } else {
                    SendEmail(members[index].email, "Не завершённый вход в аккаунт!", `
                    Здравствуйте ${members[index].name},
                    
                    Мы обращаемся к вам, чтобы уведомить о том, что недавно произошла попытка входа в ваш аккаунт ${members[index].email}. 
                    
                    Время входа: ${date}
                    IP-адрес входа: ${ip}
                    
                    Если вы не совершали это действие, немедленно выполните следующие шаги:
                    
                    1. Измените пароль аккаунта.
                    2. Свяжитесь с нами, если у вас возникли какие-либо вопросы или подозрения на несанкционированный доступ к вашему аккаунту.
                    
                    С уважением,
                    Stamina Fitness
                    `)
                }
            }
        } else {
            res.send(JSON.stringify({ status: 404 }))
        }
    }
})
app.post("/register", async (req, res) => {
    await db.read()
    const { members } = db.data
    let { name, email, validity, password, phone, plan, price, dateofjoin } = req.body
    const id = Date.now() + Math.floor(Math.random() * 900) + 100;
    const date = new Date(req.body.dateofjoin);
    date.setMonth(date.getMonth() + Number(validity));
    const expire = date.toISOString().split('T')[0]
    // Проверяем, начинается ли переменная N с "998"
    if (!phone.startsWith('998')) {
        phone = '+998' + phone;
    } else {
        phone = '+' + phone;
    }

    members.push({
        id: id,
        name: name,
        email: email,
        password: password,
        phone: phone,
        dateofjoin: dateofjoin,
        status: "Active",
        payments: [{
            plan: plan,
            validity: +validity,
            price: +price,
            payment_date: dateofjoin,
            expire_date: expire
        }]
    })
    SendEmail(email, "Успешная регистрация на сайте!", `
    Здравствуйте ${name},
    
    Вы успешно зарегистрировались на нашем сайте. Ваш аккаунт был создан с следующими данными:
    
    ID: ${id}
    Имя: ${name}
    Электронная почта: ${email}
    Пароль:${password} 
    Телефон: ${phone}
    Дата регистрации: ${dateofjoin}
    Статус: Активен
    
    Данные платежа:
    - План: ${plan}
    - Срок действия: ${validity} дней
    - Цена: ${price} сум
    - Дата платежа: ${dateofjoin}
    - Дата истечения: ${expire}
    
    Спасибо за регистрацию!
    
    С уважением,

    Stamina Fitness
    `)
    db.write()
    res.redirect("/admin")
})

app.post("/add-payment", async (req, res) => {
    let { id, plan, price, date, validity } = req.body
    console.log(req.body);
    // validity = parseInt(validity, 10);
    await db.read()
    const { members } = db.data
    function findIndexByEmail(id, members) {
        for (let i = 0; i < members.length; i++) {
            if (members[i].id == id) {
                return i;
            }
        }
        return -1;
    }
    const priceToFind = id;
    const index = findIndexByEmail(priceToFind, members);
    if (index !== -1) {
        const currentDate = new Date(date);
        const tomorrow = new Date(currentDate.valueOf() + (86400000 * validity));
        const expire = tomorrow.toISOString().split('T')[0]
        members[index].status = "Active"
        const id = Date.now()
        members[index].payments.push({
            id: id,
            plan: plan,
            validity: +validity,
            price: +price,
            payment_date: date,
            expire_date: expire
        })
        SendEmail(members[index].email, "Подтверждение успешной оплаты!", `  
        Уважаемый ,

        Мы рады сообщить вам, что ваш платеж успешно обработан. Ниже приведены детали вашего платежа:

        Данные платежа:
        - ID: ${id}
        - План: ${plan}
        - Срок действия: ${validity} дней
        - Цена: ${price} сум
        - Дата платежа: ${date}
        - Дата истечения: ${expire}

        Благодарим вас за доверие и использование наших услуг.

        С уважением,        

        Stamina Fitness
        `)
        db.write()
        res.send(JSON.stringify(200))
    } else {
        res.send(JSON.stringify(404))
    }
})
app.post("/price", async (req, res) => {
    await db.read()
    const { plan } = req.body
    const { plans } = db.data
    function findIndexByEmail(plan, plans) {
        for (let i = 0; i < plans.length; i++) {
            if (plans[i].name === plan) {
                return i;
            }
        }
        return -1;
    }

    const priceToFind = plan;
    const index = findIndexByEmail(priceToFind, plans);
    if (index !== -1) {
        res.send(JSON.stringify({ text: plans[index].price, validity: plans[index].validity }))
    } else {
        res.send(JSON.stringify({ text: "Нет Такого Плана!" }))
    }
})
app.post("/add-plan", async (req, res) => {
    const { name, price, validity } = req.body
    await db.read()
    const { plans } = db.data
    plans.push({
        id: Date.now(),
        name: name,
        validity: Number(validity),
        price: Number(price)
    })
    db.write()
    res.redirect("/admin#plan")
})
app.post("/getPlans", async (req, res) => {
    await db.read()
    const { plans } = db.data
    res.send(JSON.stringify({ obj: plans }))
})
app.post("/getUsers", async (req, res) => {
    await db.read()
    const { members } = db.data
    res.send(JSON.stringify({ members }))
})
app.post("/getCoaches", async (req, res) => {
    await db.read()
    const { coaches } = db.data
    res.send(JSON.stringify({ coaches }))
})

app.post("/getPayments", async (req, res) => {
    await db.read()
    const { members } = db.data
    res.send(JSON.stringify({ members }))
})
app.post("/removePlan", async (req, res) => {
    const { id } = req.body
    await db.read()
    const { plans } = db.data
    const index = plans.findIndex(element => element.id == id);
    if (index != -1) {
        plans.splice(index, 1)
        db.write()
        res.send(JSON.stringify(200))
    } else {
        res.send(JSON.stringify(404))
    }
})
app.post("/edit-admin-data", async (req, res) => {
    let { name, phone, email } = req.body
    await db.read()
    const { admin } = db.data
    if (!phone.startsWith('998')) {
        phone = '+998' + phone;
    } else {
        phone = '+' + phone;
    }
    admin.name = name
    admin.phone = phone
    admin.email = email
    db.write()
    res.send(JSON.stringify({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        phone: admin.phone,
        access: true, status: 200

    }))
})
app.post("/reset-admin-password", async (req, res) => {
    let { password } = req.body
    await db.read()
    const { admin } = db.data
    admin.password = password
    db.write()
    res.send(JSON.stringify({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        phone: admin.phone,
        access: true,
        status: 200
    }))
})

app.post("/checkUpdates", async (req, res) => {
    let { data } = req.body
    await db.read()
    data = JSON.parse(data)
    const { admin, members } = db.data
    if (admin.id == data.id && admin.name == data.name && admin.email == data.email && admin.password == data.password && admin.phone == data.phone) {
        res.send(JSON.stringify(200))
    } else {
        if (data.dateofjoin) {
            let isAdmin = false;
            for (let i = 0; i < members.length; i++) {
                const member = members[i];
                if (member.id == data.info.id &&
                    member.name == data.info.name &&
                    member.email == data.info.email &&
                    member.password == data.info.password &&
                    member.phone == data.info.phone &&
                    member.dateofjoin == data.info.dateofjoin &&
                    member.status == data.info.status &&
                    member.payments.length == data.info.payments.length) {
                    isAdmin = true;
                    break;
                }
            }

            if (isAdmin) {
                res.send(JSON.stringify(200));
            } else {
                res.send(JSON.stringify(404));
            }
        } else {
            res.send(JSON.stringify(404));
        }
    }
})

cron.schedule('09 14 * * *', async () => {
    SendEmail("yumid253@gmail.com", "Time Test №1", `Test 1`)
    await db.read()
    const { members } = db.data
    for (let i = 0; i < members.length; i++) {
        const e = members[i];
        const date1 = new Date();
        const date2 = new Date(e.payments[e.payments.length - 1].expire_date);
        if (date1 >= date2) {
            if (e.status == "Active") {
                e.status = "Expired"
                db.write()
            }
        }
    }
});

app.listen(port, () => console.log("http://localhost:" + port))