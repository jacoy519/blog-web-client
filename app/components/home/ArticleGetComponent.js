/**
 * Created by Medivh on 2017/3/20.
 */
import React from 'react';
import {get} from '../../utils/Request';
import Showdown from 'showdown';
import validateToken from '../../utils/Token';

class ArticleGetComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            id:1
        }

    }

    componentDidMount() {

        let url = "http://"+ window.location.hostname +":3000/blog/rest/articles/" + this.props.params.id;
        get(url)
            .then((res) => {
                if(res !== undefined) {
                    let contentContainer=document.getElementById("content_container");

                    let post=document.createElement("div");
                    post.setAttribute("class","post");
                    contentContainer.appendChild(post);

                    let postTitle = document.createElement("h1");
                    postTitle.setAttribute("class","post-title");
                    postTitle.innerHTML = res.title;

                    post.appendChild(postTitle);

                    let postMeta = document.createElement("div");
                    postMeta.setAttribute("id","post-meta-id");
                    postMeta.setAttribute("class","post-meta");
                    postMeta.innerHTML = res.createYear + "." + res.createMonth + "." + res.createDay + " " + res.createTime;
                    post.appendChild(postMeta);

                    let normalSpan = document.createElement("span");
                    normalSpan.innerHTML = '|';
                    postMeta.appendChild(normalSpan);

                    let category = document.createElement("span");
                    category.setAttribute("class", "category");
                    category.innerHTML = res.articleType;
                    postMeta.appendChild(category);

                    let normalSpan2 = document.createElement("span");
                    normalSpan2.innerHTML = '|';
                    postMeta.appendChild(normalSpan2);

                    let author = document.createElement("span");
                    author.setAttribute("class", "fa fa-user");
                    author.innerHTML = res.author;
                    postMeta.appendChild(author);

                    let postContent = document.createElement("div");
                    postContent.setAttribute("class", "post-content");
                    let converter = new Showdown.Converter();
                    postContent.innerHTML = converter.makeHtml(res.content);
                    post.appendChild(postContent);

                    validateToken()
                        .then((res) => {
                        if(res === true) {
                            let postMeta=document.getElementById("post-meta-id");

                            let normalSpan1 = document.createElement("span");
                            normalSpan1.innerHTML = '|';
                            postMeta.appendChild(normalSpan1);

                            let editLink = document.createElement("a");
                            editLink.setAttribute("href","/edit/article/update/" + this.props.params.id)
                            editLink.innerHTML = "编辑";
                            postMeta.appendChild(editLink)

                            let normalSpan2 = document.createElement("span");
                            normalSpan2.innerHTML = '|';
                            postMeta.appendChild(normalSpan2);

                            let deleteLink = document.createElement("a");
                            deleteLink.setAttribute("href","/delete/articles/" + this.props.params.id)
                            deleteLink.innerHTML = "删除";
                            postMeta.appendChild(deleteLink)
                        }

                    })

                }
            })
    }

    render () {
        return (<div id="content_container" className="content_container"></div>);
    }


}

export  default ArticleGetComponent;