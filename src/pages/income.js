/**
 * Created by zhouxs on 18/1/14.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../less/pages/income.less';

import * as actions from '../action/income';



class IncomePage extends Component{
    //构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
        this.state = {
            rmb: 91024,
            rmbDeci: 24,
            coin: 91024,
            coinDeci: 24,
            incomeList: [
                {
                    thumb: 'https://tuimeizi.cn/random?s=false&w=100&h=100',
                    info: '李强李强李强李强李强李强李强李强李强',
                    time: '2017-12-12 11:11:11',
                    rmb: 9.88,
                    coin: 99
                },
                {
                    thumb: 'https://tuimeizi.cn/random?s=false&w=100&h=100',
                    info: '李强李强李强',
                    time: '2017-12-12 11:11:11',
                    rmb: 9.88,
                    coin: 99
                }
            ]
        };
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(actions.getDatas());
    }
    render() {
        let data = this.props.data;
        let isFetching = this.props.isFetching;
        return (
            <div className="income-page">
                <div className="income-header">
                    <div className="header-title">
                        <p>家园收支明细</p>
                    </div>
                    <div className="header-cont">
                        <div className="cont-item">
                            <p className="price">{this.state.rmb}<span>.{this.state.rmbDeci}</span></p>
                            <div className="name">人民币余额(元)</div>
                        </div>
                        <div className="cont-item">
                            <p className="price">{this.state.coin}<span>.{this.state.coinDeci}</span></p>
                            <div className="name">金币余额</div>
                        </div>
                    </div>
                </div>
                <div className="income-container">
                    <h2 className="container-title">
                        收支明细
                    </h2>
                    <ul className="income-list">
                        {
                            this.state.incomeList ? (this.state.incomeList.map((item,idx) => (
                                <li className="income-list-item" key={idx}>
                                    <div className="item-thumb"><img src={item.thumb} /></div>
                                    <div className="item-info">
                                        <p className="title">{item.info}</p>
                                        <p className="time">{item.time}</p>
                                    </div>
                                    <div className="item-account">
                                        <p>+{item.rmb}元</p>
                                        <p>+{item.coin}金币</p>
                                    </div>
                                </li>
                            ))) : (null)
                        }
                    </ul>
                    <p className="list-tip">我也是有底线的</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.Income.isFetching,
    data: state.Income.data
})

export default connect(mapStateToProps)(IncomePage);