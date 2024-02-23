import React from 'react';

class ImgPreview extends React.Component {
  render() {
    const { image } = this.props;

    const styles = {
      maxWidth: '100%', // 이미지 최대 너비
      maxHeight: '100%', // 이미지 최대 높이
    };
  
    return (
      <div>
        <h1>Image Preview</h1>
        {image && <img src={image} alt="Preview" style={styles} />}
      </div>
    );
  }
}

export default ImgPreview;