import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from "next-auth/react"
import Layout from '../components/Layout'
import CollectionContextProvider from '../context/CollectionContext'
import { ItemContextProvider } from '../context/ItemContext'
import { CollectionRefContextProvider } from '../context/CollectionRefContext'
import ModalContextProvider, { modalContext } from '../context/ModalContext'
import { useContext } from 'react'

import { PopupContextProvider } from '../context/PopupContext'
import { UserContextProvider } from '../context/UserContext'

import { UserCollectionRefProvider } from '../context/UserCollectionsRef'

function MyApp({ Component, pageProps, session }: any) {


  return (
    <SessionProvider session={session}>
      <UserContextProvider>
          <CollectionRefContextProvider>
            <CollectionContextProvider>
              <UserCollectionRefProvider>
                <ItemContextProvider>
                  <ModalContextProvider>
                    <PopupContextProvider>
                      <Layout>
                          <Component {...pageProps} />
                      </Layout>
                    </PopupContextProvider>
                  </ModalContextProvider>
                </ItemContextProvider>
              </UserCollectionRefProvider>
            </CollectionContextProvider>
          </CollectionRefContextProvider>
      </UserContextProvider>
    </SessionProvider>
  )
}

export default MyApp
