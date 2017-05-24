/**
 * Created by medivh on 2017/5/20.
 */
import React from 'react';
import {get} from '../../utils/Request'

class FileUploadComponent extends React.Component {


    componentDidMount() {
        let url = "http://"+ window.location.hostname +":3000/blog/rest/images";
        get(url)
            .then((res) => {
                let imageList = document.getElementById("imageList");
                for(let index in res) {
                    let remoteFile = res[index];

                    let imageListItem = document.createElement("li");
                    imageList.appendChild(imageListItem);

                    let image = document.createElement("img");
                    image.setAttribute("src", remoteFile.src);
                    image.setAttribute("width",100);
                    imageListItem.appendChild(image);
                }
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        let file =  document.getElementsByName("file")[0].files[0];
        formData.append('file',file);
        let url = "http://"+ window.location.hostname +":3000/blog/rest/images";
        fetch(url, {
            method: 'POST',
            mode: 'cros',
            body: formData,
            headers: {
                'Accept' : 'application/json',
                'Access-Token' : localStorage.getItem("access-token") || ''
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                let imageList = document.getElementById("imageList");

                let currentFirstImageItem = document.getElementsByTagName("li")[0];
                let imageListItem = document.createElement("li");

                imageList.insertBefore(imageListItem, currentFirstImageItem);

                let image = document.createElement("img");
                image.setAttribute("src", res.src);
                image.setAttribute("width",100);
                imageListItem.appendChild(image);

            })
            .catch((err)=> {
                console.error(err);
            });
    }


    render() {
        return (
            <div>
                <form   onSubmit={(e) => this.handleSubmit(e)}>
                    <h1>使用spring mvc提供的类的方法上传文件</h1>
                    <input type="file" name="file"/>
                    <input type="submit" value="upload"/>
                </form>
                <ul id = "imageList">

                </ul>
            </div>

        ) ;
    }
}

export  default FileUploadComponent;
