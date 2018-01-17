
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

//import NoFound from './pages/404';
import Remember from './pages/remember';
import PublicHome from './pages/public-home';
import HeavenExpress from './pages/heaven-express';
import My from './pages/my';
import Login from './pages/login';
import HomeDetail from './pages/home-detail';
import HomeSet from './pages/home-set';
import HomeSetPay from './pages/home-set-pay';
import Test from './pages/test';
import Income from './pages/income';
import Pay from './pages/pay';
import VisitDetail from './pages/visit-detail';

import './index.less';

const supportsHistory = 'pushState' in window.history

ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter forceRefresh={!supportsHistory}>
			<div>
		        {/*<Redirect from="/" to="/login" />*/}
		        <Route path="/test" component={Test} ></Route>
		        <Route path="/login" component={Login} ></Route>
		        <Route path="/remember" component={Remember} ></Route>
		        <Route path="/publichome" component={PublicHome} ></Route>
		        <Route path="/heavenexpress" component={HeavenExpress} ></Route>
		        <Route path="/my" component={My} ></Route>
		        <Route path="/homedetail" component={HomeDetail}></Route>
		        <Route path="/homeset/:status" component={HomeSet}></Route>
		        <Route path="/homesetpay" component={HomeSetPay}></Route>
				<Route path="/income" component={Income} ></Route>
				<Route path="/pay" component={Pay} ></Route>
				<Route path="/visitdetail" component={VisitDetail} ></Route>
		        {/*<Route component={NoFound}/>*/}
	        </div>
	    </BrowserRouter>
	</Provider>), document.getElementById('root'));

