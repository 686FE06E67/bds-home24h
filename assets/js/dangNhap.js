jQuery(($) => {
    const gURL = "https://hom24h.up.railway.app/api";//"http://localhost:8080";
    console.log("Trang dang nhap");
    // const localToken = getLocalStorage("Token");
    let prevPage = localStorage.getItem("current");

    $(document).on("click", ".btn-login", (e) => {
        console.log("logging in ...");

        let userData = {
            username: $("#inp-username").val(),
            password: $("#inp-password").val()
        }

        if (userLoginValid(userData)) {
            formLogin(userData);
        }

    });

    //Check username by token
    function checkToken(token) {
        $.ajax({
            url: gURL + "/who",
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            data: token,
            success: async (response) => {
                window.localStorage.setItem("username", await response);
                console.log(prevPage);
                window.location.assign(prevPage);
            },
            error: (error) => {
                console.log("Phiên đăng nhập hết hạn", error);
                $("#textError").html("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại");
                $("#toastError").toast("show");
                window.localStorage.removeItem("Token");
                window.localStorage.removeItem("username");
            }

        })
    }



    //Signin
    function formLogin(userData) {

        $.ajax({
            method: "POST",
            url: gURL + "/login",
            data: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            },
            timeout: 0,
            success: async function (response) {
                window.localStorage.setItem("Token", await response);
                checkToken(response);
            },
            error: function (error) {
                $("#textError").html(error.responseText);
                $("#toastError").toast("show");
            }
        });
    }

    //Get local stored
    function getLocalStorage(itemKey) {
        return localStorage.getItem(itemKey);
    }

    //Validate data
    function userLoginValid(userData) {
        if (!userData.username) {
            alert("Tên đăng nhập không được bỏ trống!");
            return false;
        }
        if (!userData.password) {
            alert("Mật khẩu chưa điền!");
            return false;
        }
        return true;
    }
})