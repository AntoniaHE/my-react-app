/**
 * 登录
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-09 15:46:55
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../action/login';
import Popup from '../components/_Commons/Popup';

import '../less/pages/login.less';

class LoginPage extends Component {
    //构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
        this.state = {
        	phoneNum: '17632172671',
        	code: '',
        	timer: false,
        	time: 60,
        	tipPopupState: false,
            tipPopupText: '提示内容',
        };
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(actions.getDatas());
    }
	render() {
        let data = this.props.data;
        let isFetching = this.props.isFetching;
        let state = this.state;
		return (
			<div className="page-login">
				<div className="page-login-wrap">
	                {/*<a href="javascript:;" className="website-logo"></a>*/}
	                <div className="form-wrap login-form">
	                	<span className="form-item-rows">
	                		<label className="form-item-lab">
	                			<i className="form-icon icon-phone"></i>
	                		</label>
	                		<span className="form-item-inp">
	                			<input type="text" className="form-inp" placeholder="请输入验手机号" value={state.phoneNum} 
	                				onChange={this.phoneNumChange.bind(this)} />
	                		</span>
	                	</span>
	                	<span className="form-item-rows">
	                		<label className="form-item-lab">
	                			<i className="form-icon icon-code"></i>
	                		</label>
	                		<span className="form-item-inp">
	                			<input type="text" className="form-inp form-inp-short" placeholder="请输入验证码" value={state.code}
	                				onChange={this.codeChange.bind(this)} />
	                			<a href="javascript:;" className={"btn-send-code" + (state.timer ? ' disabled' : '')} onClick={this.sendCode.bind(this)}>
	                				{
	                					state.timer ? (state.time+'s') : '发送验证码'
	                				}
	                			</a>
	                		</span>
	                	</span>
	                	<span className="form-item-rows footer">
	                		<a href="javascript:;" className="form-btn-login" onClick={this.loginEvent.bind(this)}>登录</a>
	                	</span>
	                	{
	                        this.state.tipPopupState ? (
	                            <Popup show={true} type="tip" timeout="2000" 
	                                text={this.state.tipPopupText} 
	                                onClosed={this.hideTip.bind(this)} />
	                        ) : (null)
	                    }
	                </div>
                </div>
			</div>
		);
	}
	phoneNumChange(e) {
		let target = e.target;
		let value = target.value;
		this.setState({phoneNum: value});
	}
	codeChange(e) {
		let target = e.target;
		let value = target.value;
		this.setState({code: value});
	}
	verifyPhone(phoneNum) {
		let result = {status: false, msg: 'Error'};
		if(phoneNum){
			//验证手机号
			let reg = /^1[3-9]{1}[0-9]{9}$/;
			let status = reg.test(phoneNum);
			if(status)
				result = {status: true, msg: 'Success'};
			else
				result = {status: false, msg: '手机号码格式错误！'};
		}
		else{
			result = {status: false, msg: '请输入手机号！'};
		}
		return result;
	}
	sendCode() {
		let state = this.state,
			_this = this;
		if(!state.timer){
			let result = this.verifyPhone(state.phoneNum);
			if(result.status){
				this.setState({timer: true});
				let thread = setInterval(() => {
					_this.setState({time: state.time--});
					if(state.time < -1){
						clearInterval(thread);
						this.setState({timer: false, time: 60});
					}
				}, 1000);
			}
			else{
				this.showTip(result.msg);
			}
		}
	}
	loginEvent() {
		let state = this.state;

		let result = this.verifyPhone(state.phoneNum);
		if(result.status){
			if(state.code){
				this.props.history.push('/remember');
			}
			else{
				this.showTip('请输入验证码！');
			}
		}
		else{
			this.showTip(result.msg);
		}
	}
	showTip(txt) {
        if(txt){
            this.setState({
                tipPopupText: txt
            });
        }
        this.setState({
            tipPopupState: true
        });
    }
    hideTip() {
        this.setState({
            tipPopupState: false
        });
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.Login.isFetching,
    data: state.Login.data
});

export default connect(mapStateToProps)(LoginPage);

