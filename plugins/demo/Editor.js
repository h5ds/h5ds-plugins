import './editor.less';

import React from 'react';
import { Item } from 'h5ds-ui';

const icon = <i className="h5font ico-3dmoxing" />;

/**
 * props: editor, layer
 */
function Editor({ editor, layer }) {
  const onClick = () => {
    layer.data = +new Date();
    editor.updateCanvas();
  };

  const changeName = e => {
    layer.data = e.target.value;
    editor.updateCanvas();
  };

  return (
    <div className="pe-demo">
      <Item title="测试案例">
        <button onClick={onClick}>变文本</button>
        <input type="text" onChange={changeName} />
      </Item>
    </div>
  );
}
export { Editor, icon };
