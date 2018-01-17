/**
 * 家园头部
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-16 17:41:30
 */

import React, { Component } from 'react';

import './view.less';


class HomeHeader extends Component {
	//构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
    	let props = this.props;
        this.state = {
        	onCancel: props.onCancel,
        	onSure: props.onSure,
            musicStatus: false
        };
    }
    render() {
    	return (
    		<div className="comp-home-header">
    			<div className="home-header-scene">
    				<img src="https://tuimeizi.cn/random?s=false&w=640&h=450" className="thumb" />
    				<a href="javascript:;" className={"icon-music"+(this.state.musicStatus ? ' audio-rotate' : ' close')} onClick={this.playMusic.bind(this)}></a>
    				<span className="handle-icon">
    					<a href="/homeset/set" className="scene-icon icon-set"></a>
    					<a href="/income" className="scene-icon icon-income"></a>
    					<a href="javascript:;" className="scene-icon icon-position"></a>
    				</span>
    			</div>
    			<div className="home-info">
    				<span className="info-title">灵魂的家园</span>
    				<span className="date">
    					<label className="birth">生</label>
    					生辰：农历1933年2月17日
    				</span>
    				<span className="date">
    					<label className="death">忌</label>
    					忌辰：农历2015年2月17日
    				</span>
    				<span className="age man">85岁</span>
    				<div className="info-detail">
    					<span className="info-detail-item">
    						<i className="icon burner"></i>
    						记住数量：88
    					</span>
    					<span className="info-detail-item">
    						<i className="icon burner"></i>
    						上香数量：88
    					</span>
    					<span className="info-detail-item">
    						<i className="icon burner"></i>
    						祈福数量：88
    					</span>
    				</div>
    			</div>
    		</div>
    	);
    }
    playMusic() {
        let musicStatus = this.state.musicStatus;
        this.setState({musicStatus: !musicStatus});
    }
}

export default HomeHeader;