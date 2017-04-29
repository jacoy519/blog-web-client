import React from 'react';
import { browserHistory } from 'react-router';

class AccountLoginComponent extends React.Component {
    constructor () {
        super();
        this.state= {
            username:'',
            password:''
        };
    }

    handleValueChange(field, value, type='string') {
        this.setState({
            [field]	: value
        });
    }

    handleSubmit (e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        const {username,password} = this.state;
        fetch("http://"+ window.location.hostname +":3000/blog/rest/validation/account", {
            method: 'post',
            mode: 'cros',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Access-Token' : localStorage.getItem("access-token") || ''
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                localStorage.setItem("access-token",res.token);
                browserHistory.push("/home/1")
            })
            .catch((err)=> {
                console.error(err);
                browserHistory.push("/home/1")
            })
    }

    render () {
        const {username, password} = this.state;
        return (
            <div>
                <header>
                    <h1>登陆</h1>
                </header>

                <div className="content-form">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label>用户名：</label>
                        <input type="text" value={username} onChange={(e)=>this.handleValueChange('username', e.target.value)}/>
                        <br/>
                        <label>密码：</label>
                        <input className="password" type="text" value={password} onChange={(e)=>this.handleValueChange('password',e.target.value)}/>
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                    <a href="/forgetPassword"  value="忘记密码">忘记密码</a>
                </div>
            </div>

        );
    }
}

export default AccountLoginComponent;