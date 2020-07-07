import './layer.less';

import React from 'react';
import { config } from './config';
import { mountPlugin } from 'h5ds-mount-plugin';

/**
 * 图层组件
 * props:
 *  updatePage={this.updatePage} // 提供给combin使用
    forceUpdateLayers={this.forceUpdateLayers} // 提供给combin使用
    getLayerByIndex={this.getLayerByIndex} // 提供给combin使用
    isRender={isRenderThis}
    appData={appData}
    pageData={data}
    renderIn={this.props.renderIn}
    layer={layer}
    plugins={plugins}
 */
function LayerComp({ layer }) {
  const { data } = layer;
  return <div className="pl-demo">{data}</div>;
}

// 动态载入一些外部资源
const scripts = [];

mountPlugin({ LayerComp, scripts, config });

export { LayerComp, scripts, config };
