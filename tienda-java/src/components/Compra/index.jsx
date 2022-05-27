import React, { useEffect, useState } from 'react'
import { BarraBusqueda } from '../BarraBusqueda'
import { ListOfArticles } from '../ListOfArticles'
import Swal from 'sweetalert2'
import { WSClient } from '../../WSClient'
export const Compra = () => {
  const [busqueda, setBusqueda] = useState('')
  const [articulos, setArticulos] = useState([])

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    const cliente = new WSClient('/Servicio/rest/ws')
    cliente.post('get_articulos',
      {
        // se debe pasar como parametro el email del usuario a consultar
        // si el usuario no existe regresa un error
        descripcion: busqueda
      },
      function (code, result) {
        if (code === 200) {
          setArticulos(result)
        } else {
          let text
          if (code === 404) { text = 'Fallo al conectar con el servidor' } else { text = result.message }
          Swal.fire({
            title: 'Oops...',
            text: text,
            icon: 'error',
            confirmButtonText: 'Okey'
          })
        }
      }

    )
  }, [busqueda])
  return (
    <>
      <BarraBusqueda setBusqueda={setBusqueda} />
      <ListOfArticles articulos={articulos} />
    </>
  )
}
