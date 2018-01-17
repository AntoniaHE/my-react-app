import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../action/test';
import Popup from '../components/_Commons/Popup';
import RememberSwiper from '../components/Swipers/remember-swiper'
import DefaultTemplate from '../components/PageTemplate/defaults';
import VisitItem from '../components/VisitItem/index';

import '../less/pages/visitdetail.less';

class VisitDetailContent extends Component {
    //构造器
    constructor (props) {
        super(props);
        this.init();
    }
    init() {
      this.state = {
        popupState: false,
        //记住
        rememberState: true,
        //上香
        incenseState: false,
        //祈福
        cliffordState: false,
        headerList: [
          {
            type: 1,
            name: '记住人',
            isActive: true,
            keys: 'remember'
          },
          {
            type: 2,
            name: '上香人',
            isActive: false,
            keys: 'incense'
          },
          {
            type: 3,
            name: '祈福人',
            isActive: false,
            keys: 'clifford'
          }
        ]
      };
    }
	render() {
    const header = this.state.headerList
		return (
      <div className="page-wrap">
        <div className="visit-detail">
          <div className="visit-detail-header" onClick={this.sortSwitch.bind(this)}>
            <a href="javascript:;" data-state="remember" className={"header-item" + (this.state.rememberState ? ' active' : '')}>记住人</a>
            <a href="javascript:;" data-state="incense" className={"header-item" + (this.state.incenseState ? ' active' : '')}>上香人</a>
            <a href="javascript:;" data-state="clifford" className={"header-item" + (this.state.cliffordState ? ' active' : '')}>祈福人</a>
          </div>
          <div className="visit-list">
            <VisitItem />
          </div>
        </div>
      </div>
		);
	}
  sortSwitch(e){
    let dataState = e.target.getAttribute('data-state');
    console.info(dataState);
    let onSortSwitch = this.props.onSortSwitch;
    if(dataState){
      if(onSortSwitch){
        onSortSwitch(dataState);
      }
      if(dataState === 'remember'){
        this.setState({
              rememberState: true,
              incenseState: false,
              cliffordState: false
        });
      }
      else if(dataState === 'incense'){
        this.setState({
              rememberState: false,
              incenseState: true,
              cliffordState: false
        });
      }
      else if(dataState === 'clifford'){
        this.setState({
              rememberState: false,
              incenseState: false,
              cliffordState: true
        });
      }
    }
  }
  openPopup() {
      this.setState({popupState: true});
  }
  closePopup() {
      this.setState({popupState: false});
  }
  tabChange(type) {
    const list = this.state.headerList.forEach(item => {
      item.isActive = false
      if (item.type === type) {
        item.isActive = true
      }
    })
    this.setState({
      headerList: list
    })
    console.log(this.state)
  }
}

class VisitDetail extends Component {
	componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(actions.getDatas());
    }
    render() {
        return (
        	<DefaultTemplate content={VisitDetailContent} params={this.props.isFetching ? null : this.props.data} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    isFetching: state.VisitDetail.isFetching,
    data: state.VisitDetail.data
});

export default connect(mapStateToProps)(VisitDetailContent);
