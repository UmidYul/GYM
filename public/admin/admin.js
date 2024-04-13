const info = JSON.parse(localStorage.getItem("info"))
document.getElementsByClassName("profile_name")[0].textContent = info.name
document.getElementsByClassName("profile_email")[0].textContent = "ID: " + info.id
if (JSON.parse(localStorage.getItem("info")).id != "5be7e2d39a6e4") {
    window.location = "/"
}
function panel() {
    window.addEventListener('hashchange', function () {
        var page = window.location.hash.substring(1);
        loadContent(page);
    });


    function loadContent(page) {
        var content = pages[page];
        var script = document.createElement("script");
        var randomNumber = Math.random();

        script.onload = function () {
            var oldScript = document.getElementById("myScript");
            if (oldScript) {
                oldScript.parentNode.removeChild(oldScript);
            }
        };
        script.onerror = function () {
            var oldScript = document.getElementById("myScript");
            if (oldScript) {
                oldScript.parentNode.removeChild(oldScript);
            }
        };
        script.src = `/admin/panel/${page}.js?rand=${randomNumber}`;
        script.id = "myScript";
        script.type = "module"
        document.body.appendChild(script);
        document.getElementsByClassName('admin_right_panel_content')[0].innerHTML = content;
        document.getElementsByClassName("activePanelBtn")[0].classList.remove("activePanelBtn");
        document.getElementById(page).classList.add("activePanelBtn");
    }

    var pages = {
        dashboard: ` <div class="arpc_1">
                                <div class="arpc_1_left">
                                    <div class="arpc_1_row_1">
                                        <div class="arpc_1_row_1_block_1 block">
                                            <div class="arpc_1_row_1_block_1_left_side">
                                                <div class="arpc_1_row_1_block_1_left_side_title">Welcome
                                                    <span>Admin</span>
                                                </div>
                                                <div class="arpc_1_row_1_block_1_left_side_text">Добро пожаловать в
                                                    административную панель! Здесь вы можете управлять контентом,
                                                    настройками и многим другим. Приятной работы!</div>
                                            </div>
                                            <div class="arpc_1_row_1_block_1_right_side">
                                                <div class="arpc_1_row_1_block_1_right_side_circle"><img src="/images/profile_person_white.png" alt=""></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="arpc_1_row_2">
                                        <div class="arpc_1_row_2_block_2 block">
                                            <div class="block_2_row">
                                                <div class="arpc_1_row_2_block_2_header">
                                                    <div class="arpc_1_row_2_block_2_header_title">Coaches</div>
                                                    <!-- <div class="arpc_1_row_2_block_2_header_dot"><i
                                                            class="fa-solid fa-ellipsis-vertical"></i></div> -->
                                                </div>
                                                <div class="arpc_1_row_2_block_2_list">
                                                    <div class="arpc_1_row_2_block_2_list_row">
                                                        <div class="arpc_1_row_2_block_2_list_row_circle"></div>
                                                        <div class="arpc_1_row_2_block_2_list_row_name">Juan Dela Cruz</div>
                                                    </div>
                                                    <div class="arpc_1_row_2_block_2_list_row">
                                                        <div class="arpc_1_row_2_block_2_list_row_circle"></div>
                                                        <div class="arpc_1_row_2_block_2_list_row_name">Juan Dela Cruz</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="arpc_1_row_3_block_3 block">
                                            <div class="block_2_row">
                                                <div class="arpc_1_row_2_block_2_header">
                                                    <div class="arpc_1_row_2_block_2_header_title">Активных</div>
                                                    <!-- <div class="arpc_1_row_2_block_2_header_dot"><i
                                                            class="fa-solid fa-ellipsis-vertical"></i></div> -->
                                                </div>
                                                <div class="arpc_1_row_2_block_2_percentage">0%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="arpc_1_right">
                                    <div class="arpc_1_row_3">
                                        <div class="arpc_1_row_3_title">Active Members</div>
                                        <div class="arpc_1_row_1_block_4 block">
                                            <div class="block_4_row">
                                                <div class="arpc_1_row_1_block_4_header">
                                                    <div class="arpc_1_row_1_block_4_search_block">
                                                        <input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                                        maxlength="13" id="searchInput" placeholder="Search">
                                                    </div>
                                                 
                                                </div>

                                                <div class="arpc_1_row_3_block_4_list">
                                                    <div class="arpc_1_row_3_block_4_list_name">
                                                        <div class="arpc_1_row_3_block_4_list_name_row">
                                                            <div class="arpc_1_row_3_block_4_list_name_row_name">&nbsp;
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div class="arpc_1_row_3_block_4_list_date">
                                                        <div class="arpc_1_row_3_block_4_list_date_table">
                                                            <div class="table_header">
                                                                <div class="arpc_1_row_3_block_4_list_date_table_paid">Date
                                                                    paid</div>
                                                                <div class="arpc_1_row_3_block_4_list_date_table_expiry">
                                                                    Date Expiry</div>
                                                                <div class="arpc_1_row_3_block_4_list_date_table_status">
                                                                    Status</div>
                                                            </div>
                                                            <div class="table_dates">

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    `,
        profile: ` <div class="arpc_2">
        <div class="arpc_2_left">
            <div class="arpc_2_left_card card">
                <div class="card_row">
                    <div class="card_logo">
                        <div class="card_img"><img src="/images/profile_person.png" alt=""></div>
                    </div>
                    <div class="card_info">

                    </div>
                </div>
            </div>
        </div>
        <div class="arpc_2_right">
            <div class="arpc_2_right_user_info card">
                <div class="card_row">
                    <div action="/edit-admin-data" method="post" class="arpc_2_right_user_info_form">
                        <h1 class="arpc_2_right_user_info_username h1_text">Username</h1>
                        <input type="text" id="changeName" name="name">
                        <h1 class="arpc_2_right_user_info_contact h1_text">Phone</h1>
                        <input type="number" id="changePhone" name="phone">
                        <h1 class="arpc_2_right_user_info_email h1_text">Email Address</h1>
                        <input type="email" id="changeEmail" name="email">

                        <div class="form_buttons">
                            <button id="changeForm" class="form_button_save btn">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="arpc_2_right_password card">
                <div class="card_row">
                    <div action="/reset-admin-password" class="arpc_2_right_password_form">
                        <div class="arpc_2_right_password_form_title">
                            <h1 class="arpc_2_right_password_form h1_text">Current Password</h1>
                            <p class="wrong">Current password is wrong</p>
                        </div>
                        <input type="text" id="CurrentPass">
                        <h1 class="arpc_2_right_password_form h1_text">New Password</h1>
                        <input type="text" id="NewPass" name="password">
                        <h1 class="arpc_2_right_password_form h1_text">Re-type Password</h1>
                        <input type="text" id="repeatNewPass">

                        <div class="form_buttons">
                            <button id="resetPass" class="form_button_save btn">Change</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
        registration: ` <div class="arpc_3">
        <h1 class="arpc_3_subtitle">Become a Member</h1>
        <h1 class="arpc_3_title">Register</h1>
        <div class="arpc_3_block">
            <div id="registerForm" class="arpc_3_block_form">
                <div class="arpc_3_block_form_row_1">
                    <div class="arpc_3_block_form_row_1_group_1">
                        <h1 class="row_1_h1">Name of Participant</h1>
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
                <div class="arpc_3_block_form_row_3">
                    <div class="arpc_3_block_form_row_3_group_1">
                        <h1 class="row_3_h1">Password</h1>
                        <input type="text" id="pass" required name="password" class="row_3_input">
                    </div>
                    <div class="arpc_3_block_form_row_3_group_2">
                        <h1 class="row_3_h1">Plan</h1>
                        <select required class="row_3_input" id="planSelect" name="plan">
                            <option value="None">Plan</option>
                        </select>
                    </div>
                    <div class="arpc_3_block_form_row_3_group_3">
                        <h1 class="row_3_h1">Price</h1>
                        <input type="hidden" required id="hiddenValidityInput" name="validity">
                        <input type="text" required id="priceInput" class="row_3_input" value="цена" readonly>
                        <input type="hidden" required id="hiddenPriceInput" name="price">
                    </div>
                </div>
                <div class="form_buttons arpc_3_block_form_btn_1">
                    <button id="registerFormBtn" class="form_button_save btn">Save</button>
                </div>
            </form>
        </div>
     </div>`,
        plan: `<div class="arpc_4 ">
                            <form action="/add-plan" method="post" class="arpc_4_form">
                                <div class="arpc_4_row">
                                    <div class="arpc_4_form_left">
                                        <h1 class="arpc_4_h1_title">Plan Name</h1>
                                        <input type="text" required name="name" class="arpc_4_input">
                                        <h1 class="arpc_4_h1_title  arpc_4_h1_price">Price</h1>
                                        <input type="number" required name="price" class="arpc_4_input">
                                    </div>
                                    <div class="arpc_4_form_right">
                                        <div class="arpc_4_form_right_validity">
                                            <h1 class="arpc_4_h1_title">Validity</h1>
                                            <input type="number" required name="validity" class="arpc_4_input">
                                        </div>
                                        <div class="arpc_4_form_right_buttons">
                                            <button class="arpc_4_form_right_button_save">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="arpc_4_block">
                                <div class="search_system">
                                    <div class="arpc_4_block_row">
                                        <input type="text" placeholder="Search">
                                    </div>
                                </div>
                                <div class="arpc_4_block_row">
                                    <div class="arpc_4_block_column_name column">
                                        <span class="arpc_4_block_column_title">Plan Name</span>
                                    </div>
                                    <div class="arpc_4_block_column_validity column">
                                        <span class="arpc_4_block_column_title">Validity</span>
                                    </div>
                                    <div class="arpc_4_block_column_price column">
                                        <span class="arpc_4_block_column_title">Price</span>
                                    </div>

                                    <div class="arpc_4_block_column_edit column_btn">
                                        <span class="arpc_4_block_column_title">Action</span>
                                    </div>
                                </div>
                            </div>
                        </div>`,
        payment: ` <div class="arpc_5 ">
                            <h1 class="arpc_5_subtitle">Point of Sale</h1>
                            <h1 class="arpc_5_title">Add Payment</h1>
                            <div class="arpc_5_block">
                                <div id="registerForm" class="arpc_5_block_form">
                                    <div class="arpc_5_row">
                                        <div class="arpc_5_block_form_row_1">
                                            <div class="arpc_5_block_form_row_1_1">
                                                <h1 class="arpc_5_h1">ID of Member</h1>
                                                <input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                                maxlength="13" placeholder="ID" required name="id"  class="arpc_5_inputs">
                                            </div>
                                            <div class="arpc_5_block_form_row_1_2">
                                                <h1 class="arpc_5_h1">Plan</h1>
                                                <select class="arpc_5_inputs" required id="planSelect" name="plan">
                                                    <option value="None">Plan</option>
                                                </select>
                                            </div>
                                            <div class="arpc_5_block_form_row_1_3">
                                                <h1 class="arpc_5_h1">Price</h1>
                                                <input type="text" required class="arpc_5_inputs" id="priceInput"
                                                    value="цена" readonly>
                                                <input type="hidden" required id="hiddenPriceInput" name="price">
                                                <input type="hidden" required id="hiddenValidityInput" name="validity">
                                            </div>
                                        </div>
                                        <div class="arpc_5_block_form_row_2">
                                            <div class="arpc_5_block_form_row_2_1">
                                                <h1 class="arpc_5_h1 row_2_h1">Date</h1>
                                                <input type="date" type="date" required name="date"
                                                    class="arpc_5_inputs not_full_width">
                                            </div>
                                        </div>
                                        <div class="arpc_5_block_form_buttons">
                                            <button id="paymentBtn" class="form_button_save btn">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`,
        members: ` <div class="arpc_6">
                            <input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            maxlength="13" placeholder="Search By ID" id="searchInput">
                            <h1 class="arpc_6_title">Active Members</h1>
                            <div class="arpc_4_block">
                                <div class="arpc_4_block_row">
                                    <div class="arpc_4_block_column_name column">
                                        <span class="arpc_4_block_column_title">Name</span>
                                    </div>
                                    <div class="arpc_4_block_column_validity arpc_4_block_column_id column">
                                        <span class="arpc_4_block_column_title">Member ID</span>
                                    </div>
                                    <div class="arpc_4_block_column_price arpc_4_block_column_payment column">
                                        <span class="arpc_4_block_column_title">Date Payment</span>
                                    </div>
                                    <div class="arpc_4_block_column_price arpc_4_block_column_expire column">
                                        <span class="arpc_4_block_column_title">Date Expiration</span>
                                    </div>
                                    <div class="arpc_4_block_column_edit column_btn">
                                        <span class="arpc_4_block_column_title">Actions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
`,
        coaches: `   <div class="arpc_7 ">
                        <h1 class="arpc_6_title">Active Coaches</h1>
                        <div class="arpc_4_block">
                            <div class="arpc_4_block_row">
                                <div class="arpc_4_block_column_name column">
                                    <span class="arpc_4_block_column_title">Name</span>

                                </div>
                                <div class="arpc_4_block_column_validity arpc_4_block_column_id column">
                                    <span class="arpc_4_block_column_title">Coach ID</span>

                                </div>
                                <div class="arpc_4_block_column_price arpc_4_block_column_phone column">
                                    <span class="arpc_4_block_column_title">Contact</span>

                                </div>
                                <div class="arpc_4_block_column_price arpc_4_block_column_date column">
                                    <span class="arpc_4_block_column_title">Date Of Join</span>

                                </div>
                                <div class="arpc_4_block_column_edit column_btn">
                                    <span class="arpc_4_block_column_title">Actions</span>

                                </div>
                            </div>
                        </div>
                    </div>`,
        report: `<div class="arpc_8">
                        <h1 class="arpc_8_title">Sales Report</h1>
                        <!-- <form action="" class="arpc_8_form">
                            <div class="arpc_8_form_1">
                                <h1 class="arpc_8_h1">From Date</h1>
                                <input type="text" class="arpc_8_input">
                            </div>
                            <div class="arpc_8_form_2">
                                <h1 class="arpc_8_h1">To Date</h1>
                                <input type="text" class="arpc_8_input">
                            </div>
                            <div class="arpc_8_form_3">
                                <h1 class="arpc_8_h1">Total</h1>
                                <input type="text" class="arpc_8_input">
                            </div>
                        </form> -->
                        <input type="number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        maxlength="13" placeholder="Search By ID" id="searchInput">
                        <div class="arpc_8_block " id="asd">
                            <div class="arpc_4_block_row">
                                <div class="arpc_8_block_title">Payment History</div>
                            </div>
                            <div class="arpc_4_block_row">
                                <div class="arpc_4_block_column_name column">
                                    <span class="arpc_4_block_column_title arpc_8_text">Name</span>

                                </div>
                                <div class="arpc_4_block_column_validity arpc_4_block_column_id column">
                                    <span class="arpc_4_block_column_title arpc_8_text">ID</span>
                                </div>
                                <div class="arpc_4_block_column_edit arpc_4_block_column_plan column">
                                    <span class="arpc_4_block_column_title arpc_8_text">Plan</span>
                                </div>
                                <div class=" arpc_4_block_column_price column">
                                    <span class="arpc_4_block_column_title arpc_8_text">Price</span>
                                </div>
                                <div class="arpc_4_block_column_price arpc_4_block_column_paid column">
                                    <span class="arpc_4_block_column_title arpc_8_text">Date Paid</span>

                                </div>

                            </div>
                        </div>
                    </div>`
    };
    window.addEventListener('load', function () {
        var page = window.location.hash.substring(1);
        if (page === "") {
            loadContent(`dashboard`);

        } else {
            loadContent(page);
        }
    });
}
panel()
document.getElementById("signOut").addEventListener("click", () => {
    localStorage.clear()
    window.location = "/"
})