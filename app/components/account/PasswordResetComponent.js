/**
 * Created by medivh on 2017/4/29.
 */
import React from 'react';
import {get,post,put} from '../../utils/Request';
import { browserHistory } from 'react-router';

class PasswordResetComponent extends React.Component {
    constructor () {
        super();
        this.state= {
            password:'',
        };
    }

    handleValueChange(field, value, type='string') {
        this.setState({
            [field]	: value
        });
    }

    handleSubmit (e) {

        e.preventDefault();
        let url = "http://"+ window.location.hostname +":3000/blog/rest/account/passwordResetRequest?";
        let token = this.props.params.token;
        url = url + "token=" + token + "&" + "password=" + this.state.password;
        post(url, this.state);
        browserHistory.push("/edit/finish");

    }



    render() {
        const {content} = this.state;
        return (
            <div>
                <h2>输入重设密码</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    重设密码：<input id="password" onChange={(e) => this.handleValueChange('password', e.target.value)}/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default PasswordResetComponent;