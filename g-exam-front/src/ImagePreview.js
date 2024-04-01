import React from 'react';
import Modal from 'react-modal';

const PreviewModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={image !== null}
      onRequestClose={onClose}
      contentLabel="Image Preview"
    >
      <div>
        <img src={image} alt="Uploaded Image" />
      </div>
    </Modal>
  );
};

export default PreviewModal;