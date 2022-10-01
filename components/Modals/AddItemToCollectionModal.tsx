import React, {useState, useEffect, useContext} from 'react'
import { BsCheck } from 'react-icons/bs'
import { collectionContext } from '../../context/CollectionContext'
import { ICollections } from '../../types/ICollections'
import { IItems } from '../../types/IItems'
import { IUser } from '../../types/IUser'
import CancelButton from '../Buttons/CancelButton'
import DoneButton from '../Buttons/DoneButton'
import Collection from '../Collection'
import Divider from '../Divider'
import ReactLoading from "react-loading"
import { modalContext } from '../../context/ModalContext'
import { popupContext } from '../../context/PopupContext'
import { popTypes } from '../../utils/popUtils'
import CollectionMap from '../CollectionMap'
interface IProps {
    user: IUser,
    item: IItems
}
function AddItemToCollectionModal({
    user,
    item
}: IProps) {
    const {getUserCollections, addItemToCollection}  = useContext(collectionContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [collections, setCollections] = useState<ICollections[]>()
    const [selectedCollections, setSelectedCollections] = useState<ICollections[]>()
    const {setModal} = useContext(modalContext)
    const {setPopup} = useContext(popupContext)

    const isOnSelectedCollections = (id:string) => {
        var res
        selectedCollections 
        ? selectedCollections?.filter(coll => coll._id == id).length > 0 
            ? res = true
            : res = false
        : res = false
   
        return res
    }

    const handleAddItemsToCollection = async () => {
    
        if(selectedCollections) {
         
            setIsLoading(true)
            await addItemToCollection(item, selectedCollections)
            setModal({
                isOpen: false
            })
            setPopup({
                isOpen: true,
                type: popTypes.success,
                text: "Item added!"
            })
            setIsLoading(false)
         
        }
    }

    const getCollections = async () => {
        setIsLoading(true)
       const res = await getUserCollections(user)
        setCollections(res)
        setIsLoading(false)
    }   


    useEffect(() => {
        getCollections()
    }, [])
    console.log(isLoading)

  return (
    <div className='w-[80vw] h-[80vh]'>
        <div className='relative flex flex-col justify-between  w-full h-full'>
            <div className='top-0 sticky left-0 right-0'>
                <div className='flex items-center justify-around'>
                    <p className='text-center text-2xl font-semibold text-gray-900 p-8'> 
                        Add a item to a Collection
                    </p>
                
                    {isLoading  &&  
                        <div
                        
                        >
                            <ReactLoading type="spin" width={30} height={30} color="rgb(79 70 229)" />
                        </div>
                    }
                
                  
                </div>
                <Divider/>
                
            </div>

            <div className='overflow-scroll flex flex-wrap justify-center gap-12'>

                <CollectionMap
                    collections={collections}
                />
               
            </div>

            <div className='p-2 flex flex-col justify-center w-full bottom-0 sticky left-0 right-0'>
                <Divider />
                <div className='flex justify-center w-fit m-auto p-4 rounded-md gap-10  items-center'>
                
                    {selectedCollections && selectedCollections?.length > 0  ?
                        <div
                            onClick={handleAddItemsToCollection}
                        >
                                <button
                                    className='p-2 px-6 bg-indigo-700 rounded-md text-white hover:bg-indigo-800' 
                                >
                                    Done
                                </button>

                             
                        </div> :

                        <div
                            onClick={handleAddItemsToCollection}
                        >
                            <button
                                disabled
                                className='p-2 px-6 bg-indigo-300 rounded-md text-white hover:cursor-not-allowed ' 
                            >
                                Done
                            </button>
                        </div>
                        
                    
                    }

                    <button
                        className='p-2 px-6 bg-gray-500 rounded-md text-white hover:bg-gray-800'
                        onClick={() => setModal({isOpen: false})}
                    >
                        Cancel
                    </button>

                    {
                        selectedCollections && selectedCollections?.length > 0 &&

                        <div>
                            <span className='font-semibold'>
                                Selected: {" "}
                            </span>


                            <span>
                                {selectedCollections?.length}
                            </span>
                        </div>
                    }
                
                </div>


            </div>
        </div>
    </div>
  )
}

export default AddItemToCollectionModal