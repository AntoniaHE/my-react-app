/**
 * 家园场景
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-16 16:48:17
 */

import React, { Component } from 'react';

import '../less/pages/homescene.less';

class HomeScene extends Component {
	//构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
    	let props = this.props;
        this.state = {
        	onCancel: props.onCancel,
        	onSure: props.onSure
        };
    }
    componentDidMount() {
        let sceneItemWrap = document.getElementById('j-scene-item-wrap');
        if(sceneItemWrap){
        	let childs = sceneItemWrap.childNodes;
        	sceneItemWrap.style.width = ((childs.length * (270))+20)+'px';
        }
    }
	render() {
		let data = this.props.data;
		this.state.data = data;
		return (
			<div className="page-home-scene">
				<div className="scene-preview">
					<img src="https://tuimeizi.cn/random?s=false&w=640&h=450" className="thumb" />
				</div>
				<div className="scene-title">场景名称</div>
				<div className="choose-scene-title">选择3D场景</div>
				<div className="scene-wrap">
					<div className="scene-item-wrap" id="j-scene-item-wrap">
						<span className="scene-item active">
							<img src="https://tuimeizi.cn/random?s=false&w=250&h=250" className="thumb" />
							<label className="scene-name">场景名称</label>
							<a href="javascript:;" className="mask"><i className="icon-check"></i></a>
						</span>
						<span className="scene-item">
							<img src="https://tuimeizi.cn/random?s=false&w=250&h=250" className="thumb" />
							<label className="scene-name">场景名称</label>
							<a href="javascript:;" className="mask"><i className="icon-check"></i></a>
						</span>
						<span className="scene-item">
							<img src="https://tuimeizi.cn/random?s=false&w=250&h=250" className="thumb" />
							<label className="scene-name">场景名称</label>
							<a href="javascript:;" className="mask"><i className="icon-check"></i></a>
						</span>
					</div>
				</div>
                <div className="bottom-handle">
                	<a href="javascript:;" className="bottom-handle-item" onClick={this.cancelEvent.bind(this)}>取消</a>
                	<a href="javascript:;" className="bottom-handle-item sure" onClick={this.sureEvent.bind(this)}>确定</a>
                </div>
			</div>
		);
	}
	checkData(target) {
		let key = target.parentNode.getAttribute('data-key');
		let data = this.state.data[key];
		this.setState({currentData: data});
	}
	cancelEvent(e) {
		let onCancel = this.state.onCancel;
		if(onCancel)
			onCancel(e);
	}
	sureEvent(e) {
		let onSure = this.state.onSure;
		if(onSure)
			onSure(e, this.state.currentData);
	}
}

export default HomeScene;

