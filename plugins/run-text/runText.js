/**
 * @desc new RunText({boxWidth, boxHeight}, data)
 * toText(index) 显示文字
 * runAnimate() 执行动画
 */
export class RunText {
  constructor(id, { boxWidth, boxHeight }, data) {
    this.size = { boxWidth, boxHeight };
    this.data = data;
    this.id = id;
    this.padding = 20; // 两边留白
  }

  // resize
  resize({ boxWidth, boxHeight }) {
    this.size = { boxWidth, boxHeight };
    this.setPosition();
  }

  // 设置位置
  setPosition() {
    const set = { transition: 'normal', rotate: 0 };
    let prevStyle = { top: 0, left: 0, width: 0, height: 0, rotate: 0, fontSize: 0 };
    this.isChange = false;
    this.data.forEach(d => {
      // await sleep();
      const { transition, style } = d;
      // 转向延续, 旋转角度延续
      switch (transition) {
        case 'left':
          set.transition = transition;
          set.rotate += 90; // 左转90度
          this.isChange = true;
          break;
        case 'right':
          set.transition = transition;
          set.rotate += 270; // 左转270度
          this.isChange = true;
          break;
      }
      set.rotate = set.rotate % 360;

      // 计算当前的 width, height, rotate
      switch (set.rotate) {
        case 0: // 正常排版情况
          style.width = d.text.length * style.fontSize;
          style.height = style.fontSize;
          style.rotate = set.rotate;
          break;
        case 90: // 左转
          style.width = style.fontSize;
          style.height = d.text.length * style.fontSize;
          style.rotate = set.rotate;
          break;
        case 270: // 右转
          style.width = style.fontSize;
          style.height = d.text.length * style.fontSize;
          if (!d.textLock) {
            d.textLock = true;
          }
          style.rotate = set.rotate;
          break;
        case 180: // 倒转
          style.height = style.fontSize;
          style.width = d.text.length * style.fontSize;
          style.rotate = set.rotate;
          if (!d.textLock) {
            d.textLock = true;
          }
          break;
      }

      if(!prevStyle.rotate) {
        prevStyle.rotate = 0;
      }
      if(!style.rotate) {
        style.rotate = 0;
      }

      // 设置定位 0-90  0-270  90-180 90-0 180-90 180-270 270-180 270-0 0-0 90-90 270-270 180-180
      switch (`${prevStyle.rotate}-${style.rotate}`) {
        case '0-90':
          style.top = prevStyle.top + prevStyle.height;
          style.left = prevStyle.left;
          break;
        case '0-270':
          style.top = prevStyle.top + prevStyle.height;
          style.left = prevStyle.left + prevStyle.width - style.width;
          break;
        case '90-0':
          style.top = prevStyle.top + prevStyle.height;
          style.left = prevStyle.left - style.width;
          break;
        case '90-180':
          style.top = prevStyle.top;
          style.left = prevStyle.left - style.width;
          break;
        case '180-90':
          style.left = prevStyle.left - style.width + style.width;
          style.top = prevStyle.top - style.height;
          break;
        case '180-270':
          style.left = prevStyle.left + prevStyle.width - style.width;
          style.top = prevStyle.top - style.height;
          break;
        case '270-180':
          style.left = prevStyle.left + prevStyle.width - style.height;
          style.top = prevStyle.top - style.height;
          break;
        case '270-0':
          style.left = prevStyle.left + prevStyle.width;
          style.top = prevStyle.top + prevStyle.height - style.height;
          break;
        case '0-0':
          style.left = prevStyle.left;
          style.top = prevStyle.top + prevStyle.height;
          break;
        case '90-90':
          style.left = prevStyle.left - style.width;
          style.top = prevStyle.top;
          break;
        case '180-180':
          style.left = prevStyle.left;
          style.top = prevStyle.top - style.height;
          break;
        case '270-270':
          style.left = prevStyle.left + prevStyle.width;
          style.top = prevStyle.top;
          break;
      }
      prevStyle = { ...style };
      // 计算当前的位置, 和上一个位置相关
      this.isChange = false;
    });
    return this.data;
  }

  _sleep(time) {
    return new Promise(reslove => {
      this.timeout = setTimeout(() => {
        reslove(true);
      }, time || 1000);
    });
  }

  // 销毁
  destroy() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.size = null;
    this.data = null;
    this.destroyMark = true;
  }

  // 显示指定的文字
  toText(i) {
    const $texts = $(`#${this.id}`).find('.layer-runtext-textline');
    const $boxInner = $(`#${this.id}`).removeAttr('style');

    // 计算转场定位
    const { boxWidth, boxHeight } = this.size;
    let { width, height, top, left, rotate } = this.data[i].style;
    // 当前中心点
    let origin = {
      y: top + height / 2,
      x: left + width / 2
    };
    let center = {
      x: boxWidth / 2,
      y: boxHeight / 2
    };
    // 偏移量。
    let x = center.x - origin.x;
    let y = center.y - origin.y;
    // 计算缩放量
    let innerWidth = null;
    let scale = 1;
    if (rotate % 180 === 0) {
      innerWidth = width;
    } else {
      innerWidth = height;
    }
    scale = (boxWidth - this.padding * 2) / innerWidth;
    $boxInner.css({
      'transform-origin': `${origin.x}px ${origin.y}px`,
      transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`
    });
    // 全部显示
    $texts.css({
      opacity: 1
    });
  }

  // 执行动画
  async runAnimate() {
    const $texts = $(`#${this.id}`).find('.layer-runtext-textline');
    $texts.each(function() {
      $(this).css({
        opacity: 0,
        animation: ''
      });
    });
    const $boxInner = $(`#${this.id}`).removeAttr('style');
    const { boxHeight, boxWidth } = this.size;
    const data = this.data;
    let prevRotate = data[0].style.rotate;
    let rotateNow = 0;
    let prevTime = 0;
    for (let i = 0; i < $texts.length; i++) {
      if (this.destroyMark) {
        return false;
      }
      await this._sleep(prevTime * 1000);
      prevTime = data[i].text.length * 0.2;
      let $text = $texts.eq(i);
      let elem = data[i].animate;
      $text.css({
        opacity: 1,
        animation: elem
          ? `${elem.name} ${elem.time} ${elem.timing} ${elem.delay} ${elem.count} normal forwards running`
          : ''
      });
      // 计算转场定位
      let { width, height, top, left, rotate } = data[i].style;
      if (prevRotate !== rotate) {
        // 设置定位 0-90  0-270  90-180 90-0 180-90 180-270 270-180 270-0 0-0 90-90 270-270 180-180
        switch (`${prevRotate}-${rotate}`) {
          case '0-90':
            rotateNow += -90;
            break;
          case '0-270':
            rotateNow += 90;
            break;
          case '90-0':
            rotateNow += 90;
            break;
          case '90-180':
            rotateNow += -90;
            break;
          case '180-90':
            rotateNow += 90;
            break;
          case '180-270':
            rotateNow += -90;
            break;
          case '270-180':
            rotateNow += 90;
            break;
          case '270-0':
            rotateNow += -90;
            break;
        }
        // // 当前中心点
        // let origin = {
        //   y: top + height / 2,
        //   x: left + width / 2
        // };
        // let center = {
        //   x: boxWidth / 2,
        //   y: boxHeight / 2
        // };
        // // 偏移量。
        // let x = center.x - origin.x;
        // let y = center.y - origin.y;
        // 旋转了
        // $boxInner.css({
        //   'transform-origin': `${left}px ${top}px`
        // });
      }

      // 计算缩放量
      let innerWidth = null;
      let scale = 1;
      if (rotateNow % 180 === 0) {
        innerWidth = width;
      } else {
        innerWidth = height;
      }
      scale = (boxWidth - this.padding * 2) / innerWidth;
      // 执行动画
      const y = boxHeight / 2 - height / 2 - top * scale;
      $boxInner.css({
        transform: `translate(${left * scale + this.padding}px, ${y}px) rotate(${rotateNow}deg) scale(${scale})`
      });
      prevRotate = rotate;
    }
  }
}
