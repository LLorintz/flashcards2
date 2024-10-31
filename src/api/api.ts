import { flashcardType } from "../data/data";

type questionItemType={
    question:string,
    correct_answer:string,
}


export const fetchQuestions= async(amount:number=10, type:string='multiple'):Promise<flashcardType[]> =>{
    try{
        const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${type}`);
       
      if (!response.ok) {
        throw new Error;
      }
      const data = await response.json()
     
      const formattedResults=data.results.map((questionItem:questionItemType,index:number)=>{
        return {
            id:index,
            question:decodingString(questionItem.question),
            answer:decodingString(questionItem.correct_answer),
        }
      })
      return formattedResults
    
    }catch(error){
      console.error('hiba'+error)
      return [];
    } 
  }

export  const fetchCategories = async()=>{
    try{
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json();
      return data.trivia_categories;
    }catch(error){
      return [  ]
    }
  }

  const decodingString=(str:string)=>{
    const textArea= document.createElement('textarea');
    textArea.innerHTML=str;
    return textArea.value;
  }