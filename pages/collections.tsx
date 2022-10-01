
import React, { useContext, useState, useEffect } from 'react'
import { ICollections } from '../types/ICollections'
import ReactLoading from 'react-loading';
import { collectionContext } from '../context/CollectionContext'
import { userCollectionRef } from '../context/UserCollectionsRef'
import NotFound from '../components/NotFound'
import { modalContext } from '../context/ModalContext'
import CreateCollectionModal from '../components/Modals/CreateCollectionModal'
import Searchbar from '../components/Searchbar'
import AuthorImage from '../components/AuthorImage'
import UserCollectionStatus from '../components/UserCollectionStatus'
import CollectionAndFavoutiteCollectionsNav from '../components/CollectionAndFavoutiteCollectionsNav'
import BtnCreateCollection from '../components/Btn-CreateCollection'
import UserDashboardCollections from '../components/UserDashboardCollections'
import useAuthStore from '../store/authStore';
import Login from './login';



interface IProps {
  res: ICollections[]
}

function Collections() {
  const [loading, setLoading] = useState<boolean>(false)
  const {getUserCollections, getUserFavoriteCollections} = useContext(collectionContext)
  const {userCollectionsRef:collections, setUserCollectionsRef: setCollections} = useContext(userCollectionRef)
  const [favoriteCollections, setFavoriteCollections]= useState<ICollections[]>()
  
  const {user} = useAuthStore()
  const {modal, setModal} = useContext(modalContext)
  
  const [showUserCollections, setShowUserCollections] = useState<boolean>(true)
  const [search, setSearch] = useState("")
  const filtredCollections:ICollections[] = []

  
  

  const getCollections = async () => {
    if(showUserCollections) {
      const res = await getUserCollections(user!)
      setCollections(res)
    
    } else {  
      const res = await getUserFavoriteCollections(user?._id!)
      
      if(res) {
        setFavoriteCollections(res)
      }
    }
  }
  
  if(search) {
    console.log(collections)
      collections?.filter((collection:ICollections) => {
        collection.text?.toLowerCase().includes(search) &&
        filtredCollections.push(collection)
      }) 
  } 
  useEffect(() => {
    const getAllCollections = async () => {
        setLoading(true)
    
        const data = await getUserCollections(user!)
        setCollections(data)
        setLoading(false)
    }
    getAllCollections()
  }, [user])


  useEffect(() => {
    getCollections()
  }, [showUserCollections])
  
  
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
      setHasMounted(true)
  }, [])
  if(!hasMounted) {
      return null
  }
  
  if(user) {

    return (
      <div className='flex flex-col items-center'>
         {loading 
              ?
            <div className='block m-auto p-10'>
              <ReactLoading type="balls" color="rgb(79 70 229)" height={50} width={50} />
            </div> 
              : 
            <div className='flex flex-col items-center  justify-center'>
                {collections?.length > 0 ?
                
                  <div className='flex flex-col items-center justify-center'>
                        <div className='flex flex-col items-center justify-center'>
                            <AuthorImage img={user?.image} />
                            <UserCollectionStatus user={user} />
                            <h1 className='text-2xl font-semibold text-center m-4'>{user?.username}&apos;s Collections: </h1>
                        </div>
  
  
  
                        <BtnCreateCollection
                          setCollections={setCollections}
                        />
  
                        <div className='w-[55vw]'>
                          <Searchbar 
                            search={search}
                            setSearch={setSearch}
                          />
                        </div>
                        
                          <CollectionAndFavoutiteCollectionsNav 
                            showUserCollections={showUserCollections}
                            setShowUserCollections={setShowUserCollections}
                          />
                  
            
                          <UserDashboardCollections 
                            filtredCollections={filtredCollections}
                            search={search}
                            setCollections={setCollections}
                            collections={collections}
                            favoriteCollections={favoriteCollections}
                            showUserCollections={showUserCollections}
                          />
                  </div>
                  
                  :
                  <div className='flex flex-col justify-center items-center m-[50px]'>
                    <NotFound type="collections" />
                    <button className='p-2 bg-indigo-500 transition duration-100 text-white w-fit m-auto my-4 rounded-sm hover:bg-indigo-600'
                        onClick={() => {
                          setModal({
                            isOpen: true,
                            element: <CreateCollectionModal 
                            
                              setCollections={setCollections}
                            />
                          })
                        }}
                      
                      >
                          Add a new collection
                      </button>
                  </div>
                }
            </div>
          }  
      </div>
    )
  } else {
    setModal({
      isOpen: true,
      element: <Login />
    })
  }
}

export default Collections