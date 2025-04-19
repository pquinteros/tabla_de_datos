import api from '@api/axios';
import { useState, useEffect } from 'react'

interface Product {
    id: number;
    title: string;
    price: string;
  }

export default function Table(){
    const [productos, setProductos] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');
    const filteredProducts = productos.filter((item: Product) => item.title.toLowerCase().includes(search.toLowerCase()));
  
    useEffect(() => {
        const fetchProductos = async () => {
          try {
            const response = await api.get("/products");
            console.log(response)
            setProductos(response.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchProductos();
      }, []);
    
      const handleEliminar = async (id: number) => {
        const confirmar = window.confirm('¿Estás seguro de que querés eliminar este producto?');
        if (!confirmar) return;
        
        try {
          await api.delete(`/products/${id}`);
          setProductos(prev => prev.filter(p => p.id !== id));
        } catch (error) {
          console.error('Error al eliminar producto:', error);
        }
      }
    
      function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
      }
    
return (
    <>
     <input 
        type="text" 
        placeholder='Search' 
        className='w-full p-3 mb-8 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors'
        onChange={(e)=>handleSearch(e)}
      />
     <h2 className="text-xl font-bold mb-4">Lista de productos</h2>
      <div className="overflow-hidden rounded border border-gray-500 border-b-0">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-4 py-2 border-b border-r border-gray-500">Nombre</th>
              <th className="px-4 py-2 border-b border-r border-gray-500">Precio</th>
              <th className="px-4 py-2 border-b border-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(producto => (
              <tr key={producto.id}>
                <td className="border-b border-r border-gray-500 px-4 py-2 text-left">{producto.title}</td>
                <td className="border-b border-r border-gray-500 px-4 py-2">${producto.price}</td>
                <td className="border-b border-gray-500 px-4 py-2">
                  <button 
                    className="bg-gray-900 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 border-b border-gray-500">No hay productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
)
}