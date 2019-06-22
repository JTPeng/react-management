/**
 * Created by JTPeng on 2019-06-21 11:25.
 * Description：
 */
import React from 'react';

import { Switch,Route } from 'react-router-dom';

import Login from "./pages/login";
import Main from "./pages/main";

import './asset/less/index.less';
export default function App(){
  return(
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/" component={Main}/>
    </Switch>
  )
}