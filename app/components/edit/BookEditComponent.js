/**
 * Created by Medivh on 2017/3/22.
 */
import React from 'react';
import {get,post,put} from '../../utils/Request';
import { browserHistory } from 'react-router';

class BookEditComponent extends React.Component {

    constructor () {
        super();
        this.state= {
            title:'',
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
        let url = "http://"+ window.location.hostname +":3000/blog/rest/books/";
        let operationKey = this.props.params.operationKey;


        if (operationKey === "add") {
            post(url, this.state);

        }

        if(operationKey === "update") {
            url = url + this.props.params.key;
            console.log(url);
            put(url, this.state);
        }
        browserHistory.push("/edit/finish");

    }

    componentDidMount() {
        let operationKey = this.props.params.operationKey;

        if( operationKey === "update") {
            let url = "http://"+ window.location.hostname +":3000/blog/rest/books/" + this.props.params.key;
            get(url)
                .then((res) => {
                    if( res === false) {
                        return;
                    }
                    res = res.data;
                    let title = document.getElementById("title");
                    title.value= res.title;
                })
        }
    }

    render() {
        const {title} = this.state;
        return (
            <div>
                <h2>书本编辑</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    标题：<input id = "title"  onChange={(e)=>this.handleValueChange('title',e.target.value)}/><br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}

export default BookEditComponent;