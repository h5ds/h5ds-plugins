import './editor.less';

import React from 'react';
import { Item, ColorGroup } from 'h5ds-ui';
import { Button } from 'antd';

const icon = <i className="h5font ico-3dmoxing" />;

/**
 @param {object} editor 编辑器内核方法集合
 @param {object} layer 图层数据
 */
function Editor({ editor, layer }) {
  const onClick = () => {
    layer.data.text = +new Date();
    // 同步更新
    editor.updateCanvas();
  };

  const changeColor = val => {
    layer.data.color = val;
    // 延迟更新
    editor.asyncUpdateCanvas();
  };

  // 选择图片
  const selectImage = () => {
    window.pubSubEditor.publish('h5ds.imageModal.show', async data => {
      layer.data.img = data.url;
      editor.updateCanvas();
    });
  };

  return (
    <div className="pe-demo">
      <Item title="测试案例">
        <Button onClick={onClick}>变文本</Button>
      </Item>
      <Item title="背景图片">
        <Button onClick={selectImage}>选择图片</Button>
      </Item>
      <Item title="背景颜色">
        <ColorGroup value={layer.data.color} onChange={changeColor} />
      </Item>
    </div>
  );
}
export { Editor, icon };
