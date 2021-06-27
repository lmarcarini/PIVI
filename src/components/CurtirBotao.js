import React, { useCallback, useEffect, useState }  from 'react'
import {db} from '../firebase'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons'
import {useAuth} from '../context/AuthContext'

function CurtirBotao({entidadeId}) {
    const standardStyle={color:"red"}
    const hoveredStyle={color:"red",transform:"scale(1.15)"}
    const {currentUser} = useAuth()
    const [style,setStyle]=useState(standardStyle)
    const [liked, setLiked]=useState(false)

    const isCurtido=useCallback(async () => {
        const querySnapshot=await db.collection("entidades/"+entidadeId+"/curtidas").doc(currentUser.uid).get()
        setLiked(querySnapshot.exists)
    },[currentUser.uid, entidadeId])

    useEffect(()=>isCurtido(),[isCurtido])

    function curtir (e){
        e.preventDefault()
        if(!liked){
            db.collection("entidades/"+entidadeId+"/curtidas").doc(currentUser.uid).set({
                curtiu: currentUser.uid
            })
        }else{
            db.collection("entidades/"+entidadeId+"/curtidas").doc(currentUser.uid).delete().then(console.log("deletei?"))
        }
        setLiked(!liked)
    }

    function handleMouseEnter(e){
        setStyle(hoveredStyle)
    }

    function handleMouseLeave(e){
        setStyle(standardStyle)
    }

    return (
        <FontAwesomeIcon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} icon={liked?faHeart:regularHeart} style={style} size="lg" onClick={curtir}/>
    )
}

export default CurtirBotao
