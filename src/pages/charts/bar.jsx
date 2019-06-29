/**
 * Created by JTPeng on 2019-06-25 10:32.
 * Description：
 */
import React,{ Component } from 'react';

import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component{
  state = {
    option:{}
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        option : {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }
      })
    },1000)
  }

  render() {
    return(
      <div>
        <ReactEcharts option={this.state.option} />
      </div>
    )
  }
}