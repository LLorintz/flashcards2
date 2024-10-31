import { flashcardType } from "../data/data"
import Flashcard from "./Flashcard"

type flashCardListProps={
    flashcards:flashcardType[]
}

const FlashcardList = ({flashcards}:flashCardListProps) => {
  return (
    <div className="card-grid">
        {flashcards.map((flashcard:flashcardType)=>{
            return <Flashcard key={flashcard.id} flashcard={flashcard}></Flashcard>
        })}
    </div>
  )
}

export default FlashcardList