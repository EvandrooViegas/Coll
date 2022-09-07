import React, { useContext, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Modal from 'react-modal';
import { modalContext } from '../context/ModalContext';
import { popupContext } from '../context/PopupContext';
import Popup from './Popup';
import SideNavbar from './SideNavbar';


interface IProps {
  children: React.ReactNode
}

function Layout({children}: IProps) {
  Modal.setAppElement('#__next');
  const customStyles = {
    
    overlay: {
 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.66)",
      zIndex: "100"
    }, 

    content: {
      overflow: "scroll",
      maxHeight: "80vh",
      maxWidth: "90vw",
      background: "white",
      color: "black"
    }

  };
  const {popup, setPopup} = useContext(popupContext)
  const {modal, setModal} = useContext(modalContext)

  

  function closeModal() {
    setModal({isOpen: false});
  }

  return (
    <div className='width-[100vw]'>
      <div className='flex flex-col-reverse sm:flex-row'>
        <div className='flex'>

              <SideNavbar />
              <div className='flex justify-center m-10 p-2 min-w-[90vw] max-w-[98vw]'>
                {children}
              </div>
     
        </div>
        
      </div>

      <div>
        <div className='flex justify-center'>
          {popup.isOpen && (
            <Popup />
          )}
        </div>

        <div>
          <Modal
            isOpen={modal.isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            id="transition-bottom-up"
            className="text-black-rgba"
          >
     
                {modal.element}
        
          </Modal>
        </div>

      </div>

    </div>
  )
}

export default Layout