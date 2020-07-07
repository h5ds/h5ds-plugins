/**
 * 图层对于JSON数据
 * pid: 'demo',
   name: '测试',
   version: '1.0.0'
 */
export default class LayerJSON {
  id = null;
  className = null;
  keepRender = true;
  set = { hide: false, lock: false, lockWideHigh: false, pointerEvent: false };
  animate = [];
  eventId = null;
  jscript = null;
  style = { width: 200, height: 200, top: 0, left: 0 }; // div.layer 的样式
  estyle = {}; // div.element 的样式
  events = [];
  data = {
    text: 'h5ds!',
    img: 'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/7fedc4a8-23c3-4657-9c28-681353dc921e.png',
    color: '#000000'
  };
}
