import { useState, useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

function DocumentUploaderModal({ showModal, setShowModal }) {
    const [fileName, setFilename] = useState('Drop files here or clik to select file.');
  const onDrop = useCallback((acceptedFiles) => {
    setFilename(acceptedFiles[0].name);
    // Do something with the accepted files
    console.log(acceptedFiles);
  }, []);
  // Function to handle showing/hiding the modal
  const handleClose = () => setShowModal(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {/* The modal component */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div {...getRootProps()} className="d-flex align-items-center justify-content-center"  style={{border: '1px dashed #ccc', minHeight:'50px'}}>
            <input {...getInputProps()} />
            <p className="text-muted m-0 p-0">{fileName}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DocumentUploaderModal;
