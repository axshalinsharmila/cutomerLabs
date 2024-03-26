import React, {useState} from 'react'
import Modal from 'react-modal';
import TextField from './TextField';

const customStyles = {
  content: {
    top: "50%",
    left: "83%",
    right: 'auto',
    bottom: 'auto',
    height: "100%",
    width:"35%",
    marginRight: "-70%",
    transform: "translate(-50%, -50%)",
  },
};

const ReactModal = ({...props}) => {
  const {setIsOpen, modalIsOpen, children} = props
  
  return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(!modalIsOpen)}
        style={customStyles}
        contentLabel="Example Modal"
      >
       {children}
      </Modal>
  )
}

export default ReactModal