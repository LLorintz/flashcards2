export type flashcardType = {
    id:number,
    question:string,
    answer:string,
}

export type categoryType ={
    id:number,
    name:string,
}

export const SampleFlashcards:flashcardType[]=[
    {
        id:1,
        question: 'kutya?',
        answer:'dog'
    },
    {
        id:2,
        question: 'cica?',
        answer:'cat'
    }
]