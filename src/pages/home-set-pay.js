/**
 * 家园设置 支付
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-17 14:07:01
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../action/home-set-pay';

import HomeHeader from '../components/HomeHeader';

import '../less/pages/homedetail.less';


class HomeSetPay extends Component {
    //构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
        this.state = {
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
			<div className="page-home-detail">
				<HomeHeader />
                <div className="fund-raising">
                    <label className="fr-lab">已集资金</label>
                    <label className="fr-rmb"><label className="rmb-mark">￥</label>1039.88</label>
                </div>

                <div className="explain-wrap">
                	特别说明：首年维护费188.88。特别说明：首年维护费188.88。特别说明：首年维护费188.88。特别说明：首年维护费188.88。特别说明：首年维护费188.88。
                </div>
                
                <div className="pay-footer">
                    <span className="count-all">
                        <label className="count-lab">家园维护费：</label>
                        <label className="count-price">
                            ￥<label className="price-int">888</label>.88
                        </label>
                    </span>
                    <a href="javascript:;" className="btn-incense">支付以完成新建</a>
                </div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.HomeSetPay.isFetching,
    data: state.HomeSetPay.data
});

export default connect(mapStateToProps)(HomeSetPay);
