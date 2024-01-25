import React from 'react';

class ImgPreview extends React.Component {
  render() {
    const { image } = this.props;

    return (
      <div>
        <h1>Image Preview</h1>
        {image && <img src={image} alt="Preview" />}
      </div>
    );
  }
}

export default ImgPreview;