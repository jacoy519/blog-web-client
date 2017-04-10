/**
 * Created by medivh on 2017/3/23.
 */
import React from 'react';
import {del} from "../../utils/Request";
import { browserHistory } from 'react-router';

class DeleteComponent extends React.Component {



    render() {
        return (
            <div>完成编辑操作<span id="time">3</span>秒钟自动跳到首页</div>
        ) ;
    }


    componentDidMount() {
        setTimeout(
            () => {
                browserHistory.push("/home/1");
            },
            3000
        );
    }
}

export default DeleteComponent;