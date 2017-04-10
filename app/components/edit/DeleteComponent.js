/**
 * Created by medivh on 2017/3/23.
 */
import React from 'react';
import {del} from "../../utils/Request";
import { browserHistory } from 'react-router';

class DeleteComponent extends React.Component {


    componentDidMount() {
        let url = "http://"+ window.location.hostname +":3000/blog/rest/" + this.props.params.item + "/" + this.props.params.key;
        del(url, undefined);
        setTimeout(
                () => {
                    browserHistory.push("/home/1");
                },
                3000
            );
    }

    render() {
        return (
            <div>进行删除操作<span id="time">3</span>秒钟自动跳到首页</div>
        ) ;
    }

}

export default DeleteComponent;