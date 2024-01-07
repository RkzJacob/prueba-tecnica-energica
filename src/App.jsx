import { useEffect, useRef, useState,useCallback } from 'react'
import './App.css'
import { Autos } from './components/CardsAutos'
import { useAutos } from './hooks/useAutos'
import debounce from 'just-debounce-it'
import { Loading } from './components/Loading'
import { HeaderX } from './components/Headerd'
import { Footer } from './components/footer'

function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    
    if (isFirstInput.current){
      isFirstInput.current = search === ''
      return 
    }

    if(search === '' ){
      setError('No se puede buscar si el campo está vacio')
      return
    }
    if(search.match(/^\d+$/)) {
      setError('No se puede buscar un auto por numero')
      return
    }

    if (search.length < 2){
      setError('La búsqueda debe tener almenos 2 caracteres')
      return
    }

    setError(null)
    
  }, [search])

  return {search,updateSearch,error}
}
 

function App() {
  const {search,updateSearch,error} = useSearch()
  const { autos ,getAutos,loading,getAllAutos} = useAutos({search})

  useEffect(() => {
    getAllAutos()
  }, [getAllAutos])
  

  const debounceGetAutos = useCallback(
   debounce(search => {
    getAutos({search})

  },4000)
  ,[getAutos])

  
  const handleSubmit = (event) => {
    event.preventDefault()
    getAutos()
  }

  const handleChange = (evento) => {
    const newSearch = evento.target.value
    updateSearch(newSearch)
    debounceGetAutos(newSearch)

  }
  

  return (

    <div className='grid grid-cols-6 gap-4  '>

      <HeaderX/>

      <div className='col-start-2 col-end-6 items-center text-center'>
      
       
        <form className='flex items-center' onSubmit={handleSubmit}>
        <label  className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                
            </div>
            <input onChange={handleChange} value={search} name='query' type="text" placeholder='Buscar algún vehiculo' id="simple-search" className= "hover:text-black hover:bg-gray-50 focus:ring-4 focus:outline-none focus:to-blue-300 bg-blue-200 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-blue-200 dark:border-blue-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
            />
        </div>
        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:blue-300 ">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor"  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Buscar</span>
        </button>

          

        </form>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
     
      </div>
      
      
      
      <div className='col-start-2 col-end-6 grid-rows-5'>
      <main>
      {
          loading ? <Loading /> :  <Autos autos={autos}/>
      }
      </main>

      </div>
      <div className='col-start-1 col-end-7'>
      <Footer></Footer>

      </div>
      



      
    </div>
      
  )
}

export default App
