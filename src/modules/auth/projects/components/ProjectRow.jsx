import { useState } from "react"

export default function ProjectRow({product,index,key}){

    const[item, szetItem] = useState(product || {
        name: 'Nombre del producto',
        brand: {
            name: 'Marca'
        },
        price: 0,
        status: false
    });

    return(
         <tr>
                  <td>{index ? index + 1: 0}</td>
                     <td>{item.name}</td>
                     <td>{item.brand.name}</td>
                    <td>{item.price}</td>
                     <td>
                        {item.status ? (
                            <span className="badge bg-success">Sí</span>
                        ): 
                        (
                             <span className="badge bg-danger">No</span>
                        )}
                                    
                                    
                    </td>
                        <td className="text-center" style={{width: 300}} >
                            <button className="btn btn-danger me-2"><i className="bi bi-trash"></i></button>
                            <button className="btn btn-primary me-2"><i className="bi bi-pencil"></i></button>
                            <button className="btn btn-primary me-2"><i className="bi bi-plus-lg"></i></button>
                                {item.status ? (
                                    <button className="btn btn-danger"><i className="bi bi-chevron-down"></i></button>
                                ) :
                                (
                                    <button className="btn btn-success"><i className="bi bi-chevron-up"></i></button>
                                )}
                                      
                                        
                        </td>
            </tr>
    )
}