/**
 * Created by medivh on 2017/4/29.
 */
import React from 'react';
import {get,post,put} from '../../utils/Request';
import { browserHistory } from 'react-router';

class PasswordResetEmailSendComponent extends React.Component {
    constructor () {
        super();
        this.state= {
            username:'',
        };
    }

    handleValueChange(field, value, type='string') {
        this.setState({
            [field]	: value
        });
    }

    handleSubmit (e) {

        e.preventDefault();
        let url = "http://"+ window.location.hostname +":3000/blog/rest/account/passwordResetEmailRequest?username=";
        url = url + this.state.username;
        post(url, this.state);
        browserHistory.push("/edit/finish");

    }



    render() {
        const {content} = this.state;
        return (
            <div>
                <h2>输入账户</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    账户名：<input id="username" onChange={(e) => this.handleValueChange('username', e.target.value)}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default PasswordResetEmailSendComponent;
