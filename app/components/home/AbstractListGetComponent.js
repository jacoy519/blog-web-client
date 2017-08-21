/**
 * Created by Medivh on 2017/3/21.
 */
import React from 'react';
import {get} from '../../utils/Request';
import getPageNavigator from '../../utils/PageNavigator';

class AbstractListGetComponent extends React.Component {

    componentDidMount() {
       

        let request = this.props.params.request;
        let key = this.props.params.key;
        let pageNo = this.props.params.pageNo;
		
		 let node = document.getElementById("label-title");
		node.innerHTML = "正在查看 " + key;
		
        let url = undefined;

        if(request === "search") {
            url = "http://"+window.location.hostname +":3000/blog/rest/articlePage/briefSearchArticlePage?searchKey="+ key + "&pageNo=" + pageNo;

        }

        if(request === "type") {
            url = "http://"+ window.location.hostname +":3000/blog/rest/articlePage/briefTypeArticlePage?articleType="+ key + "&pageNo=" + pageNo;
        }
        get(url)
            .then((res) => {
                if(res === false) {
                    return;
                }
                res = res.data;
                let postArchive = document.getElementById("post-archive");

                let Title = document.createElement("h2");
                Title.innerHTML = this.props.params.key;
                postArchive.appendChild(Title);

                let list = document.createElement("ul");
                list.setAttribute("class", "listing");
                postArchive.appendChild(list);


                for(let index in res.list) {
                    let article = res.list[index];

                    let articleLi = document.createElement("li");
                    list.appendChild(articleLi);

                    let dateNode = document.createElement("span");
                    dateNode.setAttribute("class","date");
                    dateNode.innerHTML = article.createYear + "/" + article.createMonth + "/" + article.createDay;
                    articleLi.appendChild(dateNode);

                    let articleTitleNode = document.createElement("a");
                    let articleLink = "/article/"+article.articleId;
                    articleTitleNode.setAttribute("href",articleLink);
                    articleTitleNode.setAttribute("title",article.title);
                    articleTitleNode.innerHTML = article.title;
                    articleLi.appendChild(articleTitleNode);
                }

                let link = "/" + this.props.params.request + "/" +  this.props.params.key + "/";
                let pageNav = getPageNavigator(res.beginPageNo,res.endPageNo,res.currentPageNo,link);
                let contentContainer = document.getElementById("content_container");
                contentContainer.appendChild(pageNav);
            })

    }



    render () {
        return (<div id="content_container" className="content_container">
            <h1 id="label-title" className="label-title">已阅读书籍</h1>
            <div className="post">
                <div id="post-archive" className="post-archive">
                </div>
            </div>
        </div>);
    }

}

export default AbstractListGetComponent;
