import { useEffect, useRef, useState,useCallback } from 'react'
import './App.css'
import { Autos } from './components/CardsAutos'
import { useAutos } from './hooks/useAutos'
import debounce from 'just-debounce-it'

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
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(search.match(/^\d+$/)) {
      setError('Nose puede buscar una pelicula con un numero')
      return
    }

    if (search.length < 3){
      setError('La búsqueda debe tener almenos 3 caracteres')
      return
    }

    setError(null)
    
  }, [search])

  return {search,updateSearch,error}
}
 

function App() {
  const {search,updateSearch,error} = useSearch()
  const { autos ,getAutos,loading} = useAutos({search})

  const debounceGetAutos = useCallback(
   debounce(search => {
    getAutos({search})

  },2000)
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

    <div className=' size-full'>

      <header className='bg-white w-full size-full'  >
        <nav className="mx-auto flex  w-screen max-w-screen-2xl max-w-7xl  size-full items-center justify-between p-6 lg:px-8" aria-label="Global">  
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">a</span>
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="a"/>
          </a>
        </div>

        
        

        </nav>
        <h1 className='form text-orange-400'>buscador de pelis</h1>
        <form className='' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type="text" placeholder='Buscar algún vehiculo'/>
          <button  type='submit'>buscar</button>

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        

      </header>
      {/*Buscador */ }
      

      <main>
      {
          loading ? <p>Cargando...</p> :  <Autos autos={autos}/>
      }
      </main>



      
    </div>
      
  )
}

export default App
