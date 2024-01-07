import { useRef, useState,useCallback } from 'react'
import { searchAutos } from '../service/autos'

export function useAutos({ search }){
    const [autos, setAutos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previusSearch = useRef(search)


    const getAllAutos = useCallback(async () => {
        try {
          setLoading(true);
          setError(null);
          const allAutos = await searchAutos({ search: '' }); // Llama a la búsqueda con búsqueda vacía para obtener todos los autos
          setAutos(allAutos);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }, []);

    const getAutos = useCallback(async () => {
        if(search === previusSearch.current)return

        try {
            setLoading(true)
            setError(null)
            const newAutos = await searchAutos({search})
            setAutos(newAutos)    
            
        } catch (error) {
            setError(error.message)
            
        }finally{
            setLoading(false)
        }
    },[search])
  
    return { autos , getAutos,loading,getAllAutos}
   }