
import { BiAddToQueue } from 'react-icons/bi'
import { IItems } from '../../../types/IItems'

type Props = {
    item: IItems
    handleAddItemToCollection: () => void
}

function AddItemToCollection({
    item,
    handleAddItemToCollection
}: Props) {

  return (
    <div className='flex flex-col items-center cursor-pointer transition-all'
        onClick={handleAddItemToCollection}
    >
        <div className="hover:bg-gray-200 rounded-full p-2 group">
  
            <BiAddToQueue className='text-black group-hover:text-indigo-500 ' />
    

        </div>
      </div>
  )
}

export default AddItemToCollection