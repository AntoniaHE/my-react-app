/**
 * visit-item
 * @authors hemei
 * @date    2018年01月14日19:03:35
 */

import React from 'react';

import './index.less';
import Cover from './cover.jpg';

class VisitItem extends React.Component {
	//构造器
	constructor (props) {
		super(props);
		this.init();
	}
	init() {
		this.state = {
				popupState: false,
				Cover
		};
	}
	render() {
		return (
			<div className="visit-item">
				<span className="cover">
					<img src={Cover}/>
				</span>
				<div className="info">
					<p className="name">
						<span>张强</span>
						<span className="tips remember">记住</span>
						<span className="tips incense">上香</span>
						<span className="tips clifford">祈福</span>
					</p>
					<p className="detail">记住了外公的生日和忌日</p>
					<p className="time">2018年01月14日  18:42:16</p>
				</div>
			</div>
		)
	}
}

export default VisitItem;
