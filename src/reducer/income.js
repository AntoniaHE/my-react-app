/**
 * Created by zhouxs on 18/1/14.
 */

import {handleActions} from 'redux-actions';

export const Income = handleActions({
    REQUEST_DATAS: (state, action) => ({
        ...state,
        isFetching: true
    }),
    RECEIVE_DATAS: (state, action) => ({
        ...state,
        isFetching: false,
        data: action.payload
    })
}, {
    isFetching: true,
    data: []
});
