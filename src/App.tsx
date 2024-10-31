import { FormEvent, useEffect, useRef, useState } from "react"
import { SampleFlashcards } from "./data/data"
import { flashcardType } from "./data/data"
import FlashcardList from "./components/FlashcardList"
import './app.css'
import { fetchCategories, fetchQuestions } from "./api/api"
import { categoryType } from "./data/data"

function App() {

const [flashcards, setFlashcards] = useState<flashcardType[]>(SampleFlashcards)
const [categories, setcategories] = useState<categoryType[]>([])


useEffect(()=>{
  const getquestions =async()=>{
    const questions=await fetchQuestions()
   
    if (questions.length>0) {
      setFlashcards(questions)      
    }
  }
  getquestions()
},[])


const categoryEl = useRef<HTMLSelectElement| null>(null);
const amountEl = useRef<HTMLInputElement|null>(null)

useEffect(  ()=>{
  const getCategories=async()=>{
    const categories = await fetchCategories()
    console.log(categories)
    setcategories(categories)
  }
  getCategories()
},[])

const handleSubmit=async(e:FormEvent)=>{
  e.preventDefault();
 
    const amount = Number(amountEl.current?.value) || 10; 
    const category = categoryEl.current?.value || 'multiple'; 
    const questions = await fetchQuestions(amount, category);
    
    if (questions.length>0) {
      setFlashcards(questions)      
    }
  
  
}



return (
<>    
      <form className="header" onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="categroy">Category </label>
              <select  id="category" ref={categoryEl}>
                {categories.map(category=>(
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </select>
          </div>
          <div className="form-group">
                <label htmlFor="amount">Number Of Questions </label>
                <input type="number" id="amount" min="1" step="1" defaultValue={10} 
                ref={amountEl}/>
          </div>
          <div className="form-group">
                <button className="btn" type="submit">Generate</button>
          </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards}></FlashcardList>
      </div>
</>
  )
}

export default App
