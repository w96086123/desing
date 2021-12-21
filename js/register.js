function cancel() {
    window.location.assign('../login.html');
}

function register(){
    var div = "<div class='mark1'><div class='icon'><i class='fas fa-check-circle'></i></div><div class='checkValue'>註冊成功</div></div>";
    $('body').append(div);
    setTimeout(() => {
        window.location.assign('../login.html');
    }, 2000);
}