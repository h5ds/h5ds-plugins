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
  data = 'h5ds!';
}
