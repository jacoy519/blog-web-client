/**
 * Created by medivh on 2017/3/17.
 */
import React from 'react';
import {get} from '../utils/Request'
import validateToken from '../utils/Token';

class  HomeComponent extends React.Component {

    handleValueChange(field, value, type='string') {
        this.setState({
            [field]	: value
        });
    }

    handleSubmit (e) {
        // 阻止表单submit事件自动跳转页面的动作
        e.preventDefault();
        if( this.state.searchKey === '' || this.state.searchKey === undefined) {
            return;
        }
        let link = "http://"+window.location.hostname + "/search/" + this.state.searchKey + "/1";
        window.open(link);

    }


    constructor(){
        super();
        this.state= {
            searchKey:''
        };
    }

    componentDidMount(){
        get("http://"+ window.location.hostname +":3000/blog/rest/articleType/count")
            .then((res) => {
                if(res !== undefined) {

                    let ul = document.getElementById('category-list');

                    for(let entiy in res)
                    {
                        let articleType = entiy;
                        let count = res[entiy];

                        let li = document.createElement("li");
                        li.setAttribute('class','category-list-item');
                        ul.appendChild(li);

                        let link=document.createElement('a');
                        link.setAttribute('class', 'category-list-link');
                        let  url='/type/' + articleType + '/1';
                        link.setAttribute('href',url);
                        link.innerHTML=articleType;
                        li.appendChild(link);

                        let  span=document.createElement('span');
                        span.setAttribute('class', 'category-list-count');
                        span.innerHTML = count;
                        li.appendChild(span);


                    }


                }

             });
        let token = localStorage.getItem("access-token") || '';

        if(token === '') {
            return;
        }

        validateToken()
            .then((res) => {
                if(res === true) {
                    let description = document.getElementById("description");
                    description.innerHTML="欢迎管理员登录";

                    let navMenu = document.getElementById("nav-menu");


                     let addBookLink = document.createElement("a");
                     addBookLink.setAttribute("href","/edit/book/add");
                     navMenu.appendChild(addBookLink);

                     let addBookLinkName = document.createElement("i");
                     addBookLinkName.setAttribute("class","fa fa-cog");
                     addBookLinkName.innerHTML = "新增书本";
                     addBookLink.appendChild(addBookLinkName);

                    let addArticleLink = document.createElement("a");
                    addArticleLink.setAttribute("href","/edit/article/add");
                    navMenu.appendChild(addArticleLink);

                    let addArticleLinkName = document.createElement("i");
                    addArticleLinkName.setAttribute("class","fa fa-cog");
                    addArticleLinkName.innerHTML = "新增文章";
                    addArticleLink.appendChild(addArticleLinkName);

                    let imageLink = document.createElement("a");
                    imageLink.setAttribute("href","/image");
                    navMenu.appendChild(imageLink);

                    let imageLinkName = document.createElement("i");
                    imageLinkName.setAttribute("class","fa fa-cog");
                    imageLinkName.innerHTML = "图片";
                    imageLink.appendChild(imageLinkName);
                }
            })

    }

    render() {
        const {searchKey} = this.state;
        return(
            <div className="body_container">
                <div id="header">
                    <div className="site-name">
                        <h1 className="hidden">devchen</h1>
                        <a id="logo" href="/home/1">devchen</a>
                        <p id="description" className="description"></p>
                    </div>
                    <div id="nav-menu">
                        <a id="home-nav-link" href="/home/1">
                            <i className="fa fa-home">主页</i>
                        </a>
                        <a id="books-nav-link" href="/books">
                            <i className="fa fa-book">书单</i>
                        </a>
                        <a id="edit-nav-link" href="/login">
                            <i className="fa fa-cog">管理</i>
                        </a>
                    </div>
                </div>
                <div id="layout" className="pure-g">
                    <div className="pure-u-1 pure-u-md-3-4">
                        {this.props.children}
                    </div>
                    <div className="pure-u-1-4 hidden_mid_and_down">
                        <div id="sidebar">
                            <div className="widget">
                                <form target="_blank" className="search-form" onSubmit={(e) => this.handleSubmit(e)}>
                                    <input type="text" name="key" value={searchKey} maxLength="20" placeholder="Search"  onChange={(e)=>this.handleValueChange('searchKey', e.target.value)}/>
                                    <input type="hidden" />
                                </form>
                            </div>
                            <div className="widget">
                                <div className="widget-title">
                                    <i className="fa fa-folder-o">分类</i>
                                </div>
                                <ul id="category-list" className="category-list">
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}
export default HomeComponent;

