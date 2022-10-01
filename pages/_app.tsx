import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import Layout from '../components/Layout'
import CollectionContextProvider from '../context/CollectionContext'
import { ItemContextProvider } from '../context/ItemContext'
import { CollectionRefContextProvider } from '../context/CollectionRefContext'
import ModalContextProvider, { modalContext } from '../context/ModalContext'
import { useEffect, useContext } from 'react'
import Modal from 'react-modal';
import { popupContext, PopupContextProvider } from '../context/PopupContext'
import { UserContextProvider } from '../context/UserContext'

import { UserCollectionRefProvider } from '../context/UserCollectionsRef'
import useAuthStore from '../store/authStore'
import Router, { useRouter } from 'next/router'
import Popup from '../components/Popup'

function MyApp({ Component, pageProps, session }: any) {
  const router = useRouter()
  const currentPage = router.pathname
  const {user} = useAuthStore()
  const noNavbarPages = [
    "/",
    "/login"
 
  ]
    console.log(!noNavbarPages.includes(currentPage))

    return (
      <SessionProvider session={session}>
        <PopupContextProvider>
          <ModalContextProvider>
            <UserContextProvider>
              <ItemContextProvider>
                <CollectionRefContextProvider>
                  <CollectionContextProvider>
                    <UserCollectionRefProvider>
                        {
                          
    
                          <Layout
                            showNavbar={!noNavbarPages.includes(currentPage)}
                          >
                            <Component {...pageProps} />
                          </Layout>
                          
                      
                    
                          
                        }
                    </UserCollectionRefProvider>
                  </CollectionContextProvider>
                </CollectionRefContextProvider>
              </ItemContextProvider>
            </UserContextProvider>
          </ModalContextProvider>
        </PopupContextProvider>
      </SessionProvider>
    )
      


}

export default MyApp
