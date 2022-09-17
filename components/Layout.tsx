import React, { useContext, useState } from 'react'
import Footer from './Footer'
import Modal from 'react-modal';
import { modalContext } from '../context/ModalContext';
import { popupContext } from '../context/PopupContext';
import Popup from './Popup';
import SideNavbar from './SideNavbar';
import Link from 'next/link';


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
      color: "black",

    }

  };
  const {popup, setPopup} = useContext(popupContext)
  const {modal, setModal} = useContext(modalContext)

  

  function closeModal() {
    setModal({isOpen: false});
  }

  return (
    <div className='flex'>
   
        <div className='z-[101] md:z-[100]'>
          <SideNavbar /> 
        </div>
  
      
        <div className='z-[100] overflow-scroll fixed top-0 bottom-0 right-0 left-0 h-[93vh] md:left-[8%] md:h-screen'>
          {children}
          <div>
            <div className='flex justify-center'>
              {popup.isOpen && (
                <Popup />
              )}
            </div>

            <div className='bg-transparent'>
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


    </div>
  )
}

export default Layout