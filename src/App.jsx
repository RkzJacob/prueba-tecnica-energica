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

    <div className='page'>

      <header>
        {/*Buscador */ }
        <h1>buscador de pelis</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type="text" placeholder='Buscar algún vehiculo'/>
          <button  type='submit'>buscar</button>

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </header>

      <main>
      {
          loading ? <p>Cargando...</p> :  <Autos autos={autos}/>
      }
      </main>



      
    </div>
      
  )
}

export default App
