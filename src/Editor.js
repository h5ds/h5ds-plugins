import React from 'react';
import './umd/editor/style.css';
import EditorCore from './umd/editor';
import { cleanData } from './umd/swiper';
import { storage } from './utils';

// 载入插件
import '../plugins/demo';

export default function Editor() {
  const appId = 'appid';

  // 保存APP
  const saveApp = async data => {
    console.log(data);
    storage.local.set('H5DS_APP_DATA', data);
  };

  // 保存页面
  const savePage = async data => {
    console.log(data);
  };

  // 保存图层
  const saveLayer = async data => {
    console.log(data);
  };

  // 发布
  const publishApp = async data => {
    console.log(data);
  };

  const ImageSource = () => {
    return <div>图片模块</div>;
  };
  const SoundSource = () => {
    return <div>音乐模块</div>;
  };

  return (
    <EditorCore
      data={storage.local.get('H5DS_APP_DATA') || 'defaultData'}
      plugins={[]}
      options={{
        appId,
        saveApp, // 保存APP
        savePage, // 保存页面
        saveLayer, // 保存图层
        publishApp, // 发布APP
        publishHost: '', // 预览页面的host
        pluginsHost: '', // 插件加载的host
        mountPluginMode: 'async', // 挂载插件的方式，同步或异步挂载
        modal: {
          imageModal: {
            content: ImageSource,
            width: 1000,
            height: 600
          }
        },
        panel: {
          // 资源列表
          imageSource: ImageSource,
          soundSource: SoundSource
        }
      }}
    />
  );
}
