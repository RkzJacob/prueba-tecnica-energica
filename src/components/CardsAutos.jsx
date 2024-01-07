import { useState } from "react"
import { Pagination } from "./Pagination"

function ListOfAutos  ({ autos}) {
    const [productsPorPage, setProductsPorPage] = useState(30); 
    const [currentPage, setCurrentPage] = useState(1)
    const totalProducts = autos.length

    const lastIndex = currentPage * productsPorPage
    const firstIndex = lastIndex - productsPorPage


    return (
        <div>
      <ul className="autos ">
              {
                autos.map(auto => (
                  <li className="text-white text-left" key={auto.id}>
                    <div  className="max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-200 dark:border-gray-100 shadow-xl">
                    <a href="#">
                        <img className=" border-2  border-b-indigo-500 rounded-t-lg bg-white" src={auto.image} alt={auto.modelo} />
                    </a>
                    <div className="p-5 bg-white" >
                        <a href="#">
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800  dark:text-gray-800">{auto.marca}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-800 dark:text-gray-800">{auto.modelo}</p>
                        
                    </div>
                  </div>
                    
                  </li>
                )).slice(firstIndex,lastIndex) 
              }
        </ul>
        
            <Pagination 
            productsPorPage={productsPorPage} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            totalProducts={totalProducts}
            />
        
        </div>
        
   
    )
    
}

function NoResults(){
    return(
        <p>no hay resultados</p>
    )
}

export function Autos({ autos }){
    const hasAutos = autos?.length > 0

    return(
        hasAutos
        ? <ListOfAutos autos={autos}/>
        : <NoResults/>

    )

}