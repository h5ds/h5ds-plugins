import React from 'react';
import { render } from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Editor from './Editor';
import './utils/pubsub';
import './style.less';

// 路由
render(
  <ConfigProvider locale={zhCN}>
    <Editor />
  </ConfigProvider>,
  document.getElementById('App')
);
