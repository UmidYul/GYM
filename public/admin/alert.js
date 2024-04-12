export const alert = (field, type, msg) => {
    document.getElementById(field).style.position = "relative"
    document.getElementById(field).style.zIndex = "990"
    document.getElementById(field).innerHTML += `
    <style>
    .wrapper-success {
        margin: 120px;
    }
    
    .wrapper-success .card {
        width: 720px;
        height: 120px;
        background-color: #fff;
        padding: 10px 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-left: 5px solid #49d761;
        border-radius: 3px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    
    .wrapper-success .card .subject {
        margin-right: 180px;
    }
    
    .wrapper-success .card .subject p {
        color: #909092;
    }
    
    .wrapper-success .card .icon {
        font-size: 28px;
        color: #49d761;
    }
    
    .wrapper-success .card .icon-times {
        font-size: 28px;
        color: #c3c2c7;
        cursor: pointer;
    }
    
    /* /warning/ */
    
    .wrapper-warning {
        margin: 120px;
    }
    
    .wrapper-warning .card {
        width: 720px;
        height: 120px;
        background-color: #fff;
        padding: 10px 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-left: 5px solid #fdc220;
        border-radius: 3px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    
    .wrapper-warning .card .subject {
        margin-right: 180px;
    }
    
    .wrapper-warning .card .subject p {
        color: #909092;
    }
    
    .wrapper-warning .card .icon {
        font-size: 28px;
        color: #fdc220;
    }
    
    .wrapper-warning .card .icon-times {
        font-size: 28px;
        color: #c3c2c7;
        cursor: pointer;
    }
    
    .wrapper-success,
    .wrapper-warning {
        position: absolute;
        top: -100px;
        right: -90px;
    }
    
    .subject {
        padding-left: 30px;
    }
    </style>
    <div class="wrapper-success" style="display: none; position:absolute; z-index: 999;">
    <div class="card">
        <div class="icon"><i class="fas fa-check-circle"></i></div>
        <div class="subject">
            <h3>Success</h3>
            <p id="msg_success"></p>
        </div>
    </div>
</div>

<div class="wrapper-warning" style="display: none; position:absolute; z-index: 999;">
    <div class="card">
        <div class="icon"><i class="fas fa-exclamation-circle"></i></div>
        <div class="subject">
            <h3>Warning</h3>
            <p id="msg_err"></p>
        </div>
    </div>
</div>
    `
    if (type == 404) {
        document.getElementsByClassName("wrapper-warning")[0].style.display = "block"
        msg_err.innerText = msg
        setTimeout(() => {
            document.getElementsByClassName("wrapper-warning")[0].style.display = "none"
        }, 5000);
    }
    if (type == 200) {
        document.getElementsByClassName("wrapper-success")[0].style.display = "block"
        msg_success.innerText = msg
        setTimeout(() => {
            document.getElementsByClassName("wrapper-success")[0].style.display = "none"
        }, 5000);
    }
}