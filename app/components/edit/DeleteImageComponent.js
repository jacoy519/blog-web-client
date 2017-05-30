/**
 * Created by medivh on 2017/3/23.
 */
import React from 'react';
import {del} from "../../utils/Request";
import { browserHistory } from 'react-router';

class DeleteImageComponent extends React.Component {


    componentDidMount() {
        let url = "http://"+ window.location.hostname +":3000/blog/rest/images?fileName=" + this.props.location.query.name;
        del(url, undefined);
        setTimeout(
                () => {
                    browserHistory.push("/image");
                },
                3000
            );
    }

    render() {
        return (
            <div>进行删除操作<span id="time">3</span>秒钟自动跳转图片编辑页面</div>
        ) ;
    }

}

export default DeleteImageComponent;