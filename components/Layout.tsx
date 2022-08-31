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
      background: "rgba(0, 0, 0, 0.5)"
    }, 


  };
  const {popup, setPopup} = useContext(popupContext)
  const {modal, setModal} = useContext(modalContext)

  

  function closeModal() {
    setModal({isOpen: false});
  }

  return (
    <div className='width-[100vw] overflow-hidden'>
      <div className='flex flex-col-reverse sm:flex-row'>
        <div className='flex'>
            <div>
              <SideNavbar />
            </div>

            <div className='w-full sm md:m-[10vw]'>
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
          <div className="flex bg-white p-10 w-[100%] justify-center h-fit rounded-lg 'id='transition-bottom-up m-10 text-black">
            {modal.element}
          </div>
          </Modal>
        </div>

      </div>

    </div>
  )
}

export default Layout