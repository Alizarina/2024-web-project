import react from "@vitejs/plugin-react";
function userMenu(state,name){

        return (
            <div style='margin: 10px; padding: 5px;border: 1px skyblue dashed; font-size: 15px;float: right;'
                 className="account">
                <a href="register.html"><p>注册账号</p></a>
                <a href="login.html"><p>登录账号</p></a>
                <p >欢迎你</p>
                <a href="login.html"><p>登录账号</p></a>
            </div>
        );

}
