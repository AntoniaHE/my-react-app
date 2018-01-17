import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../less/pages/pay.less';

import * as actions from '../action/pay';
import Popup from '../components/_Commons/Popup';
import '../less/pages/homedetail.less';

class PayPage extends Component {
    //构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init(){
        this.state = {
            relationPopupState: false,
            tipPopupState: false,
            tipPopupText: '提示内容',
            countNum: 0
        }
    }
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(actions.getDatas());
    }
    render(){
        let data = this.props.data;
        let isFetching = this.props.isFetching;
        let state = this.state;
        return(
            <div className="pay-page page-home-detail">
                <div className="pay-header">
                    <img src="https://tuimeizi.cn/random?s=false&w=640&h=500"/>
                </div>
                <div className="pay-info">
                    <div className="info-cont">
                        <div className="cont-items">
                            <i className="icons icon-title"></i>
                            <p>尊称：--(张三)</p>
                        </div>
                        <div className="cont-items">
                            <i className="icons icon-relationship"></i>
                            <p>关系：--(张三)</p>
                        </div>
                    </div>
                    <div className="info-func"></div>
                    <a href="javascript:;" className="update-btn" onClick={this.openPopupRelation.bind(this)}>修改</a>
                    {
                        this.state.relationPopupState ? (
                            <Popup show={true} 
                                title="修改关系" 
                                tempView={UpdateRelationship}
                                onClosed={this.closePopupRelation.bind(this)}
                                buttons={({
                                    cancel: {text: '取消', type: 'cancel', handle: this.updateBtnCancel.bind(this)},
                                    sure: {text: '保存', type: 'sure', handle: this.updateBtnSave.bind(this)}
                                })}
                                />
                        ) : (null)
                    }
                    {
                        this.state.tipPopupState ? (
                            <Popup show={true} type="tip" timeout="3000" 
                                text={this.state.tipPopupText} 
                                onClosed={this.hideTip.bind(this)} />
                        ) : (null)
                    }
                </div>
                <div className="fund-raising">
                    <label className="fr-lab">已集资金</label>
                    <label className="fr-rmb"><label className="rmb-mark">￥</label>1039.88</label>
                </div>
                <textarea className="common-inp textarea" placeholder="想说的话"></textarea>
                <div className="pay-cont-txt">
                    <div className="h-title">
                        <span className="title-wrap">
                            <i className="bg"></i>
                            <label className="txt">关于上香、祈福</label>
                        </span>
                    </div>
                    <p className="content">
                    正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容
                    </p>
                </div>
                <div className="pay-footer">
                    <span className="footer-counter-wrap">
                        <a href="javascript:;" className="btn-jian" onClick={()=>{this.countEvent.bind(this)(-1)}}></a>
                        <span className="counter-wrap">{state.countNum}</span>
                        <a href="javascript:;" className="btn-jia" onClick={()=>{this.countEvent.bind(this)(1)}}></a>
                    </span>
                    <span className="count-all">
                        <label className="count-lab">合计：</label>
                        <label className="count-price">
                            ￥<label className="price-int">888</label>.88
                        </label>
                    </span>
                    <a href="javascript:;" className="btn-incense">上香</a>
                </div>
            </div>
        )
    }
    countEvent(num){
        this.setState({countNum: this.state.countNum+num});
    }
    updateBtnSave() {
        console.info('save');
        this.showTip();
        return false;
    }
    updateBtnCancel() {
        //console.info('cancel');
    }
    openPopupRelation() {
        this.setState({relationPopupState: true});
    }
    closePopupRelation() {
        this.setState({relationPopupState: false});
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


//弹窗-修改关系
class UpdateRelationship extends Component {
    render() {
        return (
            <div className="update-relation-ship">
                <form className="form-wrap relation-ship-form">
                    <div className="form-item-rows">
                        <label className="form-item-lab">尊称</label>
                        <span className="form-item-inp">
                            <input type="text" className="form-inp" placeholder="请输入尊称" />
                        </span>
                    </div>
                    <div className="form-item-rows">
                        <label className="form-item-lab">关系</label>
                        <span className="form-item-inp">
                            <input type="text" className="form-inp" placeholder="请输入关系" />
                        </span>
                    </div>
                    <div className="form-item-rows">
                        <label className="form-item-lab">姓名</label>
                        <span className="form-item-inp">
                            <input type="text" className="form-inp" placeholder="请输入你的姓名" />
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.Income.isFetching,
    data: state.Income.data
})

export default connect(mapStateToProps)(PayPage);