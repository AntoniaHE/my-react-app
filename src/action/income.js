/**
 * Created by zhouxs on 18/1/14.
 */

import {createAction} from 'redux-actions';

import utils from '../utils';

const requestDatas = createAction('REQUEST_DATAS');
const receiveDatas = createAction('RECEIVE_DATAS');

export const getDatas = () => async dispatch => {
    dispatch(requestDatas());
    //let data = await utils.fetch({ url: '/getresource/2' });
    let data = [{item1: '选项一', item2: '选项二'}];
    dispatch(receiveDatas(data));
};