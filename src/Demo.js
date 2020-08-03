import React, { Component } from 'react';
import './demo.less';
import { util } from 'h5ds-ui';

var data = {
  name: '名称',
  desc: '描述'
};

const history = [];

export default class Demo extends Component {
  changeName = e => {
    data.name = e.target.value;
    history.push(util.cloneDeep(data));
    this.forceUpdate();
  };

  undo = () => {
    data = history.pop();
    this.forceUpdate();
  };

  render() {
    return (
      <div className="demo">
        <button onClick={this.undo}>撤销</button>
        <button>重做</button>
        <div className="demo-phone">{data.name}</div>
        <div className="demo-set">
          <input defaultValue={data.name} onChange={this.changeName} />
        </div>
      </div>
    );
  }
}
