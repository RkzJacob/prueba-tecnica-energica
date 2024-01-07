

export function Pagination ({ productsPorPage,currentPage,setCurrentPage,totalProducts }){
    const pageNumerbs = []

    for (let i=1; i <= Math.ceil(totalProducts / productsPorPage); i++){
        pageNumerbs.push(i)
    }
    
    const onPreviusPage = () =>{
        setCurrentPage(currentPage - 1)
    }
    const onNextPage = () =>{
        setCurrentPage(currentPage + 1)
    }

    const onSpecificPage = (n)=>{
        setCurrentPage(n)
    }
    


    return (
        <div className="flex items-center justify-center p-10">
            <a onClick={onPreviusPage}  className="flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md  border border-black  dark:bg-white dark:text-gray-500">
                Anterior
            </a>
            

            {
                pageNumerbs.map( pageNumber => (
                    
                        <a  key={pageNumber} onClick={() =>  onSpecificPage(pageNumber)} 
                        className="items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white border border-black  rounded-md sm:flex dark:bg-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                            {pageNumber}
                        </a> 
                    

                ))}
            <a onClick={onNextPage}  className="flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300  transform border border-black bg-white rounded-md dark:bg-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200">
                Siguiente
            </a>
        </div>
    )
}