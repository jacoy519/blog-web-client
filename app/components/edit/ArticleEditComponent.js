/**
 * Created by Medivh on 2017/3/22.
 */
import React from 'react';
import ShowDown from  'showdown';
import {get, post, put} from  '../../utils/Request';
import { browserHistory } from 'react-router';


class ArticleEditComponent extends React.Component {

    constructor () {
        super();
        this.state= {
            title:'',
            articleType:'',
            author:'',
            content:''
        };
        console.log("test");
    }

    handleValueChange(field, value, type='string') {
        this.setState({
            [field]	: value
        });
        if (field === 'content') {
            let target = document.getElementById('targetDiv');
            let converter = new ShowDown.Converter();
            let html = converter.makeHtml(value);
            target.innerHTML = html;
        }

    }

    handleSubmit (e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        let title = document.getElementById("title");
        this.state.title = title.value;
        console.log(this.state.title)

        let author = document.getElementById("author");
        this.state.author = author.value;

        let articleType = document.getElementById("articleType");
        this.state.articleType =  articleType.value;

        let content = document.getElementById("article-content");
        this.state.content = content.value;

        let url = "http://"+ window.location.hostname +":3000/blog/rest/articles/";
        let operationKey = this.props.params.operationKey;
        console.log(operationKey);

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
            let url = "http://"+ window.location.hostname +":3000/blog/rest/articles/" + this.props.params.key;
            get(url)
                .then((res) => {
                    if( res.success === false) {
                        return;
                    }
                    res = res.data;
                    let title = document.getElementById("title");
                    title.value= res.title;

                    let author = document.getElementById("author");
                    author.value = res.author;

                    let articleType = document.getElementById("articleType");
                    articleType.value = res.articleType;

                    let content = document.getElementById("article-content");
                    content.value = res.content;

                })
        }


    }

    render() {
        const {content} = this.state;
        return (
            <div>
                <h2>文章编辑</h2>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    标题：<input id = "title"  onChange={(e)=>this.handleValueChange('title',e.target.value)}/><br/>
                    作者：<input id ="author"  onChange={(e)=>this.handleValueChange('author',e.target.value)}/><br/>
                    类型：<input id ="articleType"  onChange={(e)=>this.handleValueChange('articleType',e.target.value)}/><br/>
                    <textarea  id="article-content" rows="20" cols="200"  onChange={(e)=>this.handleValueChange('content', e.target.value)}></textarea>
                    <input type="submit" value="Submit" />
                </form>
                <hr/>
                <div className="post">
                    <div className="post-content" id="targetDiv"></div>
                </div>
            </div>
        );
    }

}

export default ArticleEditComponent;
