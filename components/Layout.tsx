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
  showNavbar?: boolean
}

function Layout({children, showNavbar}: IProps) {
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

  if(showNavbar != false && showNavbar != true) {
    showNavbar = false
  }
  
  console.log(showNavbar)

  function closeModal() {
    setModal({isOpen: false});
  }

  return (
    <div className='flex'>
   
        {showNavbar &&
          <div className='z-[101] md:z-[101]'>
            <SideNavbar /> 
          </div>
        }
  
      
        <div className={ showNavbar 
          ? `z-[100] overflow-y-scroll overflow-x-hidden fixed top-0 bottom-0 right-0 w-[100vw] md:w-[83vw]`
          : `z-[100] overflow-y-scroll overflow-x-hidden fixed top-0 bottom-0 right-0 w-[100vw]`
        }>
          {children}
          <div>
            <div className='z-[200] flex justify-center'>
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