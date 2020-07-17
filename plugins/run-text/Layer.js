import './layer.less';

import React, { useEffect, useReducer } from 'react';
import { config } from './config';
import { mountPlugin } from 'h5ds-mount-plugin';
import { RunText } from './runText';
import { randomID } from './util';
import classNames from 'classnames';

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
function LayerComp({ layer, renderIn }) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const onlyShow = ['render_in_pagelist', 'render_in_canvas', 'render_in_templates'].includes(renderIn);
  const { data } = layer;
  const id = `id_${randomID()}`;
  const padding = 4;

  useEffect(() => {
    // 开始动画
    let runText = null;
    if (!onlyShow) {
      // 设置宽高
      data.forEach(item => {
        const size = item.style.fontSize + padding;
        item.style.lineHeight = size + 4;
        item.style.height = size + 4;
        item.style.width = size * item.text.length;
      });
      runText = new RunText(
        id,
        {
          boxWidth: layer.style.width,
          boxHeight: layer.style.height
        },
        data
      );
      runText.setPosition();

      // 赋值了top, left, 旋转等参数, 需要更新视图
      forceUpdate();
      runText.runAnimate();
    }

    return () => {
      if (runText) {
        runText.destroy();
      }
    };
  }, []);

  return (
    <div
      id={id}
      className={classNames('pl-run-text', {
        'pl-run-text-show': onlyShow
      })}
    >
      {data.map(item => {
        const { rotate = 0 } = item.style;
        const size = item.style.fontSize + padding;
        item.style.lineHeight = size + 4;
        item.style.height = size + 4;
        item.style.width = size * item.text.length;
        if (rotate === 180 || rotate === 270) {
          item.text = item.text
            .split('')
            .reverse()
            .join('');
        }
        return (
          <div className="layer-runtext-textline animated" key={item.keyid} style={{ ...item.style }}>
            <div className="layer-runtext-textline-inner">
              {item.text.split('').map((d, i) => {
                return (
                  <span
                    style={{
                      transform: `rotate(${rotate}deg)`,
                      lineHeight: size + 'px',
                      height: size,
                      width: size
                    }}
                    key={i}
                  >
                    {d}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 动态载入一些外部资源
const scripts = [];

mountPlugin({ LayerComp, scripts, config });

export { LayerComp, scripts, config };
