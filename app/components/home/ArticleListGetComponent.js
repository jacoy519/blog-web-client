/**
 * Created by Medivh on 2017/3/21.
 */
import React from 'react';
import {get} from '../../utils/Request';
import getPageNavigator from '../../utils/PageNavigator';
import Showdown from 'showdown';

class ArticleListGetComponent extends  React.Component {

    componentDidMount() {

        let navNode = document.getElementById("home-nav-link");
        if(navNode !== undefined) {
            navNode.setAttribute("class","current");
        }

        let pageNo = this.props.params.pageNo;
        if(pageNo === undefined) {
            pageNo = 1;
        }

        let url= "http://"+ window.location.hostname +":3000/blog/rest/articles?pageNo=" + pageNo;

        get(url)
            .then((res)=> {
                if (res === undefined) {
                    return;
                }

                let contentContainer=document.getElementById("content_container");
                for (let index in res.list) {

                    let article = res.list[index];

                    let articleLink = "/article/"+article.articleId;

                    let post=document.createElement("div");
                    post.setAttribute("class","post");
                    contentContainer.appendChild(post);

                    let postTitle = document.createElement("h2");
                    postTitle.setAttribute("class","post-title");
                    post.appendChild(postTitle);

                    let titleLink = document.createElement("a");
                    titleLink.setAttribute("href",articleLink);
                    titleLink.innerHTML = article.title;
                    postTitle.appendChild(titleLink);

                    let postMeta = document.createElement("div");
                    postMeta.setAttribute("class","post-meta");
                    postMeta.innerHTML = article.createYear + "-" + article.createMonth + "-" + article.createDay ;
                    post.appendChild(postMeta);


                    let postContent = document.createElement("div");
                    postContent.setAttribute("class", "post-content");
                    postContent.setAttribute("style", "word-break: normal;height:200px;word-wrap:break-word;overflow:hidden;");
                    let converter = new Showdown.Converter();
                    postContent.innerHTML = converter.makeHtml(article.content);
                    post.appendChild(postContent);

                    let readMore = document.createElement('p');
                    readMore.setAttribute("class","readmore");
                    post.appendChild(readMore);

                    let readMoreLink = document.createElement("a");
                    readMoreLink.setAttribute("href",articleLink);
                    readMoreLink.innerHTML = "阅读更多";
                    readMore.appendChild(readMoreLink);
                }

                let pageNav = getPageNavigator(res.beginPageNo,res.endPageNo,res.currentPageNo,"/home/");
                contentContainer.appendChild(pageNav);
            })

    }

    render () {
        return (<div id="content_container" className="content_container"></div>);
    }
}

export default ArticleListGetComponent;
