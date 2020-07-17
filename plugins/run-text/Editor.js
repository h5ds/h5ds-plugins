import './editor.less';

import React, { useReducer } from 'react';
import { Item, util, ColorGroup, FontSize } from 'h5ds-ui';
import { Input, Collapse, Button, Select } from 'antd';

const icon = <i className="h5font ico-3dmoxing" />;

/**
 @param {object} editor 编辑器内核方法集合
 @param {object} layer 图层数据
 */
function Editor({ editor, layer }) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // 设置字体大小
  const setSize = (v, item) => {
    item.style.fontSize = v;
    editor.updateCanvas();
  };

  // 设置旋转
  const changeTransition = (v, item) => {
    item.transition = v;
    editor.setHistory();
    // editor.updateCanvas();
  };

  // 添加文字
  const addText = () => {
    layer.data.push({
      keyid: util.randomID(),
      text: '酷炫文字特效',
      animate: null,
      style: {
        fontSize: util.randomNumber(12, 120),
        rotate: 0,
        color: 'rgba(0,0,0,1)'
      },
      transition: 'normal'
    });
    editor.updateCanvas();
    forceUpdate();
  };

  // 修改文字
  const changeText = (val, item) => {
    item.text = val;
    editor.updateCanvas();
    forceUpdate();
  };

  const setColor = (val, item) => {
    item.style.color = val;
    editor.updateCanvas();
    forceUpdate();
  };

  const { Panel } = Collapse;
  return (
    <div className="pe-run-text">
      <Item title="文字设置" block={true}>
        <Collapse accordion={true} bordered={false}>
          {layer.data.map((item, index) => {
            console.log('item', item);
            return (
              <Panel key={item.keyid} header={item.text}>
                <ColorGroup value={item.style.color} onChange={v => setColor(v, item)} />
                <div className="pe-run-text-item">
                  <span>文字大小：</span>
                  <FontSize width={120} value={item.style?.fontSize} onChange={v => setSize(v, item)} />
                </div>
                <Input
                  onChange={e => changeText(e.target.value, item)}
                  placeholder={item.text}
                  defaultValue={item.text}
                />
              </Panel>
            );
          })}
        </Collapse>
        <br />
        <Button onClick={addText} block={true}>
          添加文字
        </Button>
      </Item>
    </div>
  );
}
export { Editor, icon };
