import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Telegraf } from "telegraf";
import bodyParser from "body-parser";
const bot = new Telegraf("6017294767:AAEw06sviYcR8ZFAQdcYGrc6N1vUgfzSJrs")
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/main.html")
})
app.post("/form", (req, res) => {
    const { name, lastname, number, email, text } = req.body
    bot.telegram.sendMessage(-1001900984249, `
Имя: ${name}

Фамилия: ${lastname}

Номер: ${number}

Пол: ${email}

Сообщение: ${text}
        `, {
        parse_mode: "HTML"
    })
    res.redirect("/")
})
app.listen(port, () => console.log("http://localhost:" + port))