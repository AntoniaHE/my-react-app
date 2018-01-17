/**
 * RadioButton
 * @authors AndyPan (pye-mail@163.com)
 * @date    2018-01-12 16:56:48
 */
import React from 'react';

import Popup from '../Popup';

import './view.less';

let NameGroup = {}, count = 0;

class RadioButton extends React.Component {
	constructor(props) {
		super(props);
		this.init();
	}
	init() {
		let props = this.props;
		let keys = 'radio-'+count;

		this.state = {
			checked: props.checked || false,
			text: props.text || '',
			name: props.name || 'default',
			keys: keys,
			onChecked: props.onChecked,
			className: props.className,
			id: props.id,
			value: props.value
		}

		NameGroup[this.state.name] = NameGroup[this.state.name] || {};
		NameGroup[this.state.name][keys] = this.state.checked;

		count++;
	}
	render() {
		let name = this.state.name;
		let keys = this.state.keys;
		return (
			<a href="javascript:;" className={"radio-button"+(this.state.checked ? ' checked' : '')+(this.state.className ? " "+this.state.className : '')} 
				data-keys={keys} 
				data-name={name}
				data-value={this.state.value} 
				onClick={this.onChecked.bind(this)}>
				<i className="icon-radio"></i>
				<label className="radio-txt">{this.state.text}</label>
				<input type="radio" className="radio-target" id={this.state.id} value={this.state.value} />
			</a>
		)
	}
	componentDidMount(){
		let name = this.state.name;
		let keys = this.state.keys;
		NameGroup['renderState'] = NameGroup['renderState'] || {};
		NameGroup['renderState'][name] = NameGroup['renderState'][name] || {};
		NameGroup['renderState'][name][keys] = this.renderState.bind(this);
		/*let _this = this;
		setTimeout(()=>{
			_this.onChecked();
		}, 500);*/
	}
	renderState(checked) {
		this.setState({checked: checked});
	}
	onChecked(e) {
		let name = this.state.name;
		let keys = this.state.keys;
		let fun;
		for(var key in NameGroup[name]){
			NameGroup[name][key] = false;
			fun = NameGroup['renderState'][name][key];
			if(fun)
				fun(false);
		}
		let thisChecked = !NameGroup[name][keys];
		NameGroup[name][keys] = thisChecked;

		NameGroup['renderState'][name][keys](thisChecked);

		let checkedEvent = this.state.onChecked;
		if(checkedEvent){
			checkedEvent(e.target, {value: this.state.value});
		}
	}
}

export default RadioButton;

