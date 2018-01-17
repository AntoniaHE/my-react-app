/**
 * 守护者
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-16 10:54:51
 */
import React, { Component } from 'react';

import RadioButton from '../components/_Commons/RadioButton';

import '../less/pages/guardian.less';

class Guardian extends Component {
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
	render() {
		let data = this.props.data;
		this.state.data = data;
		return (
			<div className="page-guardian">
				{
                    data ? (data.map((item, idx)=>(
                            <div className="guardian-item" key={idx} data-key={idx}>
			                	<span className="guardian-info-wrap">
			                		<img className="thumb" src={item.thumb} />
			                		<label className="name">{item.name}</label>
			                		<label className="remark">{item.remark}</label>
			                	</span>
			                	<RadioButton name="guardian" className="full-radio" onChecked={this.checkData.bind(this)} value={item.value}/>
			                </div>
                        )
                    )) : (null)
                }
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

export default Guardian;


