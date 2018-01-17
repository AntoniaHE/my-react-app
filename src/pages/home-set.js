/**
 * 家园设置-非守护者-未填写
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-15 14:47:19
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../action/home-set';
import Popup from '../components/_Commons/Popup';
import FormInput from '../components/_Commons/FormInput';
import Guardian from './guardian';
import Music from './music';
import HomeScene from './home-scene';

import '../less/pages/homeset.less';

class HomeSet extends Component {
    //构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
    	let props = this.props;
        let params = props.params || props.match.params;

        this.state = {
        	status: params.status || 'add',
            //选择守护人
            guardianStatus: false
        };
    }
    componentDidMount() {

        console.info(this.props.history);
    }
	render() {
        let data = this.props.data;
        let state = this.state;
        return (
        	<div>
	        {
	        	state.status === 'add' ? (<NewHomeInfo goBack={this.props.history.goBack} />) : (<HomeInfo goBack={this.props.history.goBack} />)
	        }
	        </div>
        )
    }
}

//编辑家园信息
class HomeInfo extends Component {
	//构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
        this.state = {
        	qrcodePopupState: false,
            goBack: this.props.goBack,
        };
    }
	render() {
        let data = this.props.data;
        return (
        	<div className="page-home-set form-wrap">
        		<div className="home-set-name">张永发的灵魂家园</div>
        		<FormInput tipText="真实姓名" value="张永发" placeholder="请输入真实姓名" />
        		<FormInput tipText="尊称" placeholder="请输入对逝者的称呼" />
        		<FormInput tipText="关系" placeholder="请输入您与逝者的关系" />
        		<FormInput tipText="我的姓名" placeholder="请输入您的姓名" />
        		<span className="split-space"></span>
        		<FormInput tipText="灵魂的守护者" placeholder="请输入灵魂的守护者" />
        		<FormInput tipText="转发家园二维码" qrCode={true} onClick={this.showQRCodePopup.bind(this)} />
        		{
                    this.state.qrcodePopupState ? (
                        <Popup show={true} 
                            title="长按保存下方二维码" 
                            tempView={QRCode} 
                            clickMaskHide={true} 
                            onClosed={this.hideQRCodePopup.bind(this)}
                            />
                    ) : (null)
                }
                <div className="public-number-wrap">
                	<div className="public-number-qrcode">
                		<img src={require('../images/public-number-qrcode.png')} className="thumb" />
                		<label className="remark">WAITER微信公众号</label>
                	</div>
                </div>
                <div className="bottom-handle">
                	<a href="javascript:;" className="bottom-handle-item" onClick={this.goBack.bind(this)}>取消</a>
                	<a href="javascript:;" className="bottom-handle-item sure">确定</a>
                </div>
        	</div>
        )
    }
    showQRCodePopup() {
    	this.setState({
    		qrcodePopupState: true
    	});
    }
    hideQRCodePopup() {
    	this.setState({
    		qrcodePopupState: false
    	});
    }
    goBack() {
        let goBack = this.state.goBack;
        if(goBack)
            goBack();
    }
}

//新增家园信息
class NewHomeInfo extends Component {
	//构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
        this.state = {
        	qrcodePopupState: false,
            musicStatus: false,
            homeSceneStatus: false,
            goBack: this.props.goBack,
            //守护者名字
            guardian: '',
            mockData: [
                {thumb: 'https://tuimeizi.cn/random?s=false&w=100&h=100', name: '张三', remark: '哈哈', value: 1},
                {thumb: 'https://tuimeizi.cn/random?s=false&w=100&h=100', name: '李四', remark: '哈哈', value: 2},
                {thumb: 'https://tuimeizi.cn/random?s=false&w=100&h=100', name: '王五', remark: '哈哈', value: 3},
                {thumb: 'https://tuimeizi.cn/random?s=false&w=100&h=100', name: '小六', remark: '哈哈', value: 4}
            ],
            music: '',
            musicData: [
                {thumb: require('../images/music.png'), name: 'a.mp3', value: 1},
                {thumb: require('../images/music.png'), name: 'b.mp3', value: 2},
                {thumb: require('../images/music.png'), name: 'c.mp3', value: 3},
                {thumb: require('../images/music.png'), name: 'd.mp3', value: 4}
            ]
        };
    }
	render() {
        let data = this.props.data;
        let state = this.state;
        return (
        	<div className="page-home-set form-wrap">
        		<div className="home-set-name">张永发的灵魂家园</div>
                <FormInput type="title" titleText="基础信息" />
        		<FormInput tipText="真实姓名" value="张永发" placeholder="请输入真实姓名" />
        		<FormInput tipText="尊称" placeholder="请输入对逝者的称呼" />
        		<FormInput tipText="关系" placeholder="请输入您与逝者的关系" />
                <FormInput tipText="守护者" value={state.guardian} placeholder="选择守护者" forward="/#" onClick={this.chooseGuardian.bind(this)} />
                {state.guardianStatus ? (<Guardian onCancel={this.cancelEvent.bind(this)} onSure={this.sureEvent.bind(this)} data={state.mockData} />) : (null)}
        		<span className="split-space"></span>

                <FormInput type="title" titleText="生平资料" />
                <FormInput tipText="生平简介" type="textarea" placeholder="请输入生平简介" />
        		<FormInput type="date" tipText="生辰" placeholder="请选择年月日" />
        		<FormInput type="date" tipText="忌辰" placeholder="请选择年月日" />
        		<span className="split-space"></span>

                <FormInput type="title" titleText="其他设置" />
                <FormInput tipText="墓地位置" placeholder="请选择墓地位置" forward="/#" />
                <FormInput tipText="3D场景" placeholder="请选择3D场景" forward="/#" onClick={this.chooseScene.bind(this)} />
                {state.homeSceneStatus ? (<HomeScene onCancel={this.sceneCancelEvent.bind(this)} onSure={this.sceneSureEvent.bind(this)} />) : (null)}

                <FormInput tipText="背景音乐" placeholder="请选择背景音乐" forward="/#" onClick={this.chooseMusic.bind(this)}  />
                {state.musicStatus ? (<Music onCancel={this.musicCancelEvent.bind(this)} onSure={this.musicSureEvent.bind(this)} data={state.musicData} />) : (null)}

        		<FormInput tipText="转发家园二维码" disabled={true} placeholder="家园新建后生成二维码" />
        		<FormInput tipText="转发家园二维码" qrCode={true} onClick={this.showQRCodePopup.bind(this)} />
        		{
                    this.state.qrcodePopupState ? (
                        <Popup show={true} 
                            title="长按保存下方二维码" 
                            tempView={PublicNumberQRCode} 
                            clickMaskHide={true} 
                            onClosed={this.hideQRCodePopup.bind(this)}
                            />
                    ) : (null)
                }
                
                <div className="bottom-handle">
                	<a href="javascript:;" className="bottom-handle-item" onClick={this.goBack.bind(this)}>取消</a>
                	<a href="javascript:;" className="bottom-handle-item sure">新建家园</a>
                </div>
        	</div>
        )
    }
    chooseGuardian(e, setData) {
        this.setState({guardianStatus: true, setData: setData});
    }
    cancelEvent() {
        this.setState({guardianStatus: false});
    }
    sureEvent(e, data) {
        this.setState({guardianStatus: false, guardian: data.name});
        this.state.setData({value: data.name});
    }

    chooseMusic(e, setData) {
        this.setState({musicStatus: true, setData: setData});
    }
    musicCancelEvent() {
        this.setState({musicStatus: false});
    }
    musicSureEvent(e, data) {
        this.setState({musicStatus: false, music: data.name});
        this.state.setData({value: data.name});
    }

    chooseScene() {
        this.setState({homeSceneStatus: true});
    }
    sceneCancelEvent() {
        this.setState({homeSceneStatus: false});
    }
    sceneSureEvent() {
        this.setState({homeSceneStatus: false});
        console.info('sure');
    }
    goBack() {
        let goBack = this.state.goBack;
        if(goBack)
            goBack();
    }
    showQRCodePopup() {
    	this.setState({
    		qrcodePopupState: true
    	});
    }
    hideQRCodePopup() {
    	this.setState({
    		qrcodePopupState: false
    	});
    }
}

class QRCode extends Component {
	render() {
		return (
			<div className="popup-qrcode-wrap">
				<img className="thumb" src={require('../images/qr-code.png')} />
				<span className="remark">张永发的灵魂家园</span>
			</div>
		)
	}
}
class PublicNumberQRCode extends Component {
	render() {
		return (
			<div className="popup-qrcode-wrap">
				<img className="thumb" src={require('../images/qr-code.png')} />
				<span className="remark">公众号二维码</span>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.HomeSet.isFetching,
    data: state.HomeSet.data
});


export default connect(mapStateToProps)(HomeSet);

