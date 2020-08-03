import './layer.less';

import React from 'react';
import { config } from './config';
import { mountPlugin } from 'h5ds-mount-plugin';

/**
 * 图层组件
 props:
 @param {Function} updatePage 更新当前页面的方法
 @param {Function} forceUpdateLayers 更新指定的图层 (layerIndexs:[], callback:Function)
 @param {Function} getLayerByIndex 通过下标获取图层数据 (layerIndex:Number)
 @param {boolean} isRender 是否切换到了当前页面，渲染中，如果切换到其他页面，该参数变成false
 @param {Object} appData 全局APP数据，如果单独渲染页面，该参数为null
 @param {Object} pageData 页面数据，如果单独渲染图层，该参数为null
 @param {boolean} renderIn 当前渲染的环境
 renderIn对应的环境如下：
 // 字段映射
 const renderIn = {
  RENDER_IN_PAGELIST: 'render_in_pagelist', // 在页面列表渲染
  RENDER_IN_TEMPLATES: 'render_in_templates', // 在模板列表渲染
  RENDER_IN_CANVAS: 'render_in_canvas', // 在绘图区域渲染
  RENDER_IN_PREVIEW: 'render_in_preview', // 在预览区域渲染
  RENDER_IN_INDEPENDENT: 'render_in_independent', // 独立渲染
  RENDER_IN_PUBLISH: 'render_in_publish' // 在发布区域渲染
 };
 @param {object} layer 图层对应的数据
 */
function LayerComp({ layer }) {
  const { data } = layer;
  return (
    <div className="pl-demo" style={{color: data.color}}>
      {data.text}
    </div>
  );
}

// 动态载入一些外部资源
const scripts = [];

mountPlugin({ LayerComp, scripts, config });

export { LayerComp, scripts, config };
