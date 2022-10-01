import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import Layout from '../components/Layout'
import CollectionContextProvider from '../context/CollectionContext'
import { ItemContextProvider } from '../context/ItemContext'
import { CollectionRefContextProvider } from '../context/CollectionRefContext'
import ModalContextProvider, { modalContext } from '../context/ModalContext'
import { useEffect } from 'react'

import { PopupContextProvider } from '../context/PopupContext'
import { UserContextProvider } from '../context/UserContext'

import { UserCollectionRefProvider } from '../context/UserCollectionsRef'
import useAuthStore from '../store/authStore'
import Router, { useRouter } from 'next/router'

function MyApp({ Component, pageProps, session }: any) {
  const router = useRouter()
  const currentPage = router.pathname
  const noNavbarPages = [
    "/",
    "/login"
 
  ]



  

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
                        !noNavbarPages.includes(currentPage)
                        ? 
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                        :
                        <Component {...pageProps} />
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
