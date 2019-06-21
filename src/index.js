/**
 * Created by JTPeng on 2019-06-21 11:23.
 * Description：入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(<Router><App/></Router>,document.getElementById('root'));