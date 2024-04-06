import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from "body-parser";
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const defaultData = { admin: [], members: [], plans: [], sales: [], payment: [] }
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
    const { email, password } = req.body
    const { members, admin } = db.data
    if (email == admin.email) {
        console.log(1);
        if (password == admin.password) {
            res.send("admin")
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
            res.send("member")
        } else {
            res.send("404")
        }
    }
})
app.post("/register", async (req, res) => {
    await db.read()
    const { members } = db.data
    const { name, email, validity, password, plan, price, dateofjoin } = req.body
    const id = Date.now() + Math.floor(Math.random() * 900) + 100;
    const date = new Date(req.body.dateofjoin);
    date.setMonth(date.getMonth() + Number(validity));
    const expire = date.toISOString().split('T')[0]
    members.push({
        id: id,
        name: name,
        email: email,
        password: password,
        dateofjoin: dateofjoin,
        payments: [{
            plan: plan,
            validity: validity,
            price: price,
            payment_date: dateofjoin,
            expire_date: expire
        }]
    })
    db.write()
    res.redirect("/admin")
})

app.post("/add-payment", async (req, res) => {
    const { id, plan, price, date, validity } = req.body
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
        const date1 = new Date(date);
        date1.setMonth(date1.getMonth() + Number(validity));
        const expire = date1.toISOString().split('T')[0]
        members[index].payments.push({
            plan: plan,
            validity: validity,
            price: price,
            payment_date: date,
            expire_date: expire
        })
        db.write()
    } else {
        res.send(JSON.stringify({ text: "Данный Пользователь Не Найден!" }))
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
app.post("/getPlans", async (req, res) => {
    await db.read()
    const { plans } = db.data
    res.send(JSON.stringify({ obj: plans }))
})
app.listen(port, () => console.log("http://localhost:" + port))