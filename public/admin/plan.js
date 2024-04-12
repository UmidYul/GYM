fetch("/getPlans", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 200 })
})
    .then(res => res.json())
    .then(data => {
        const nameDiv = document.getElementsByClassName("arpc_4_block_column_name")[0]
        const validityDiv = document.getElementsByClassName("arpc_4_block_column_validity ")[0]
        const priceDiv = document.getElementsByClassName("arpc_4_block_column_price")[0]
        const editDiv = document.getElementsByClassName("arpc_4_block_column_edit")[0]
        if (data.obj.length > 8) {
            data.obj = data.obj.slice(0, 8)
        }
        nameDiv.innerHTML += data.obj.map(i => `
            <span class="arpc_4_block_column_text">${i.name}</span>
            `).join(" ")
        validityDiv.innerHTML += data.obj.map(i => `
            <span class="arpc_4_block_column_text">${i.validity}</span>
            `).join(" ")
        priceDiv.innerHTML += data.obj.map(i => `
            <span class="arpc_4_block_column_text">${i.price}</span>
            `).join(" ")
        editDiv.innerHTML += data.obj.map(i => `
            <span class="arpc_4_block_column_text"><button
            class="arpc_4_block_column_btn" onclick="deletePlan(${i.id})" id="${i.id}">Remove</button></span>
            `).join(" ")
    })
function deletePlan(id) {
    const rem = fetch("/removePlan", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(data => {
            if (data == 200) {
                window.location = "/admin#plan"
            } else {
                alert("Извините но мы е нашли такой план просим перезагрузить страницу и попробовать снова или обратиться к разработчикам!")
            }
        })
}