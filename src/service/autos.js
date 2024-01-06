
const API = 'https://auto-cl-default-rtdb.firebaseio.com/V1/vehicles/new/search/data.json'

export const searchAutos = async ({ search }) =>{
    if(search === '') return []

    try {
        const response = await fetch(API)
        const json = await response.json()

        if (!json || !Array.isArray(json)) {
            throw new Error('Invalid data format');
        }

        const autos = json.filter((auto) =>
            auto.brand.toLowerCase().includes(`${search}`.toLowerCase()) &&
            auto.type.toLowerCase().includes('model') 
        );

        return autos?.map((auto) => ({
            id: auto.path, 
            marca: auto.brand,
            modelo: auto.model, 
            image: auto.image,
        }));
        
    } catch (error) {
        throw new Error('error searching autos')
        
    }
  

}