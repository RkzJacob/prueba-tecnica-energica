function ListOfAutos  ({ autos}) {
    return (
        <ul className="autos">
              {
                autos.map(auto => (
                  <li className="autos" key={auto.id}>
                    <h3>{auto.marca}</h3>
                    <p>{auto.modelo}</p>
                    <img src={auto.image} alt={auto.modelo} />
                  </li>
                ))  
              }
        </ul>
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