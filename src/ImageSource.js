import React, { Component } from 'react';

export default class ImageSource extends Component {
  // 选择图片
  selectImage = elem => {
    if (this.selectImageCallBack) {
      this.selectImageCallBack(elem);
    }
    if (this.selectImageModalCallBack) {
      this.selectImageModalCallBack(elem);
      this.props.editor.showModal('');
    }
  };

  componentDidUpdate() {
    if (!this.props.show) {
      this.selectImageCallBack = null;
      this.selectImageModalCallBack = null;
    }
  }

  componentDidMount() {
    if (this.props.type === 'source') {
      window.pubSubEditor.subscribe('h5ds.imageSource.show', callback => {
        this.props.editor.showPanel('imageSource');
        this.selectImageCallBack = callback;
      });
    }

    if (this.props.type === 'modal') {
      window.pubSubEditor.subscribe('h5ds.imageModal.show', callback => {
        this.props.editor.showModal('imageModal');
        this.selectImageModalCallBack = callback;
      });
    }
  }

  componentWillUnmount() {
    if (this.props.type === 'source') {
      window.pubSubEditor.unsubscribe('h5ds.imageSource.show');
    }
    if (this.props.type === 'modal') {
      window.pubSubEditor.unsubscribe('h5ds.imageModal.show');
    }
  }

  render() {
    const data = [
      'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/7fedc4a8-23c3-4657-9c28-681353dc921e.png',
      'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/7678b6dc-c6dc-4511-8e4f-7a97b836c371.png',
      'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/616725c0-268e-42ca-b207-fd5cc0f54aa1.png',
      'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/1b88bbf9-406b-4189-be28-85ff28e954d4.png',
      'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/bacd61c2-fd58-4959-a525-824fcf1c7853.png',
      'http://h5ds-cdn.oss-cn-beijing.aliyuncs.com/upload/9f6229a9-1769-4018-8555-461f98310b26.png'
    ];
    return (
      <div className="image-source-list">
        {data.map((d, i) => {
          return (
            <li key={i}>
              <img onClick={() => this.selectImage({ url: d })} src={d} alt="" />
            </li>
          );
        })}
      </div>
    );
  }
}
