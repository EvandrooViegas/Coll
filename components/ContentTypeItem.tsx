import { Console } from 'console'
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { styles } from '../styles/tailwindStyles'
import { IContentType } from '../types/IContentType'

interface IProps {
    content: IContentType
    selectedContent: IContentType
    children: any
}
function ContentTypeItem({content, selectedContent, children}:IProps) {
    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        padding: "10px 7px",
        cursor: "pointer",
        background: `${content.id == selectedContent.id ? "#e0e0e0" : "transparent"}`,
        transition: ".2s ease-in"
    }
  
    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default ContentTypeItem