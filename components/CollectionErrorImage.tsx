import Image from 'next/image'
import React, {useEffect, useState} from 'react'
interface IProps {
    image?: string,
    hight?: number
}
function CollectionErrorImage({image, hight}: IProps) {
    const [img, setImg] = useState(image)
    const errorImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEU0NDQehnfUAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
    useEffect(() => {
        setImg(image)
    }, [image])
  return (
    
    
        <div
            className={`relative h-${hight ? hight : "full"}  w-full object-cover `}
        >

            <Image 
                src={img!}
                className={"object-cover rounded-lg"}
                layout="fill"
                onError={() => {
                    setImg(errorImage)
                }}
            />

        </div>

        
        
   
  )
}

export default CollectionErrorImage