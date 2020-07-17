import { randomID } from './util';

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
  style = { width: 320, height: 514, top: 0, left: 0 }; // div.layer 的样式
  estyle = {}; // div.element 的样式
  events = [];
  data = [
    {
      keyid: randomID(),
      text: '酷炫文字特效',
      animate: {
        tips: '弹入',
        cropIndex: 11,
        type: 'in',
        direction: 'normal',
        fillMode: 'forwards',
        name: 'bounceIn',
        duration: 1,
        delay: 0,
        count: 1,
        timing: 'ease'
      },
      style: { fontSize: 32, rotate: 0, color: 'rgba(0,0,0,1)' },
      transition: 'normal' // 文字旋转方向normal，left，right
    }
  ];
}
