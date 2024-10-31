import { useState, useEffect, useRef } from "react";
import { flashcardType } from "../data/data"


type flashcardprops={
    flashcard:flashcardType;
}



const Flashcard = ({flashcard}:flashcardprops) => {
  const [flip,setFlip] = useState(false);
  const [height, setHeight] = useState(0)

  const handleFlip=()=>{
    setFlip((prevFlip) => !prevFlip)
  }



  const frontEl=useRef<HTMLDivElement | null>(null);
  const backEl=useRef<HTMLDivElement | null>(null);

  const setMaxHeight=()=>{
    const frontHeight = frontEl.current?.getBoundingClientRect().height ||0
    const backHeight = backEl.current?.getBoundingClientRect().height||0
    
      const maxHeight=Math.max(frontHeight, backHeight, 100)      
    
    setHeight(maxHeight)
  }

  useEffect(()=>{
    setMaxHeight()
  },[flashcard.question,flashcard.answer])

  return (
    <div className={`card ${flip?'flip':''}`} onClick={handleFlip} style={{height:height}}>
        <div className="front" ref={frontEl}>
            {flashcard.question}
        </div>
        <div className="back" ref={backEl}>
            {flashcard.answer}
        </div>
    
    </div>
  )
}

export default Flashcard