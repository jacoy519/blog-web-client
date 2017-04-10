/**
 * Created by Medivh on 2017/3/21.
 */
import React from 'react';
import {get} from '../../utils/Request'
import validateToken from '../../utils/Token';

class BookListGetComponent extends React.Component {




    componentDidMount() {
        let navNode = document.getElementById("books-nav-link");
        if(navNode !== undefined) {
            navNode.setAttribute("class","current");
        }

        let url= "http://"+ window.location.hostname +":3000/blog/rest/books";
        get(url)
            .then((res) => {

                if(res === undefined) {
                    return;
                }
                let postArchive = document.getElementById("post-archive");


                let max= undefined;

                for (let year in res) {
                    if(max === undefined || year > max) {
                        max = year;
                    };
                }



                for (let i=max;i>=2015;i--) {
                    let bookList = res[i];
                    if(bookList != undefined) {
                        let yearTitle = document.createElement("h2");
                        yearTitle.innerHTML = i;
                        postArchive.appendChild(yearTitle);

                        let list = document.createElement("ul");
                        list.setAttribute("class", "listing");
                        postArchive.appendChild(list);

                        for(let index in bookList) {
                            let book = bookList[index];

                            let bookNode = document.createElement("li");
                            bookNode.setAttribute("name","book-Node");
                            bookNode.setAttribute("value",book.id);
                            list.appendChild(bookNode);



                            let bookTitleNode = document.createElement("a");
                            bookTitleNode.innerHTML = book.title;
                            bookNode.appendChild(bookTitleNode);

                        }
                    }

                }

                validateToken()
                    .then((res) => {
                        if(res === true ) {

                            let nodes = document.getElementsByName("book-Node");

                            for (let i=0 ;i<nodes.length ;i++) {
                                let childNode = nodes.item(i);
                                let id = childNode.attributes.getNamedItem("value").nodeValue;


                                let normalSpan1 = document.createElement("span");
                                normalSpan1.innerHTML = '|';
                                childNode.appendChild(normalSpan1);

                                let editLink = document.createElement("a");
                                editLink.setAttribute("href","/edit/book/update/" + id);
                                editLink.innerHTML = "编辑";
                                childNode.appendChild(editLink);

                                let normalSpan2 = document.createElement("span");
                                normalSpan2.innerHTML = '|';
                                childNode.appendChild(normalSpan2);

                                let deleteLink = document.createElement("a");
                                deleteLink.setAttribute("href","/delete/books/" + id);
                                deleteLink.innerHTML = "删除";
                                childNode.appendChild(deleteLink);


                            }


                        }
                    })

            })


    }

    render () {
        return (<div id="content_container" className="content_container">
                    <h1 className="label-title">已阅读书籍</h1>
                    <div className="post">
                        <div id="post-archive" className="post-archive">
                        </div>
                    </div>
                </div>);
    }



}

export default BookListGetComponent;
