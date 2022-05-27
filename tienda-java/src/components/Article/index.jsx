import React from 'react'
import { Div, BotonComprar, Botones, Description, Img, Precio, P } from './styles'
import { TextField } from '@mui/material'
import { AddIcon } from './AddIcon'
import Swal from 'sweetalert2'
import { WSClient } from '../../WSClient'
export const Article = ({ article }) => {
  const { id, descripcion, precio, foto } = article
  const inputProps = {
    step: 1,
    min: 1
  }
  function handleClick (e) {
    const container = e.target.parentElement.parentElement
    const cliente = new WSClient('/Servicio/rest/ws')
    cliente.post('anade_carrito',
      {
        id_articulo: container.children[0].innerText,
        cantidad: container.children[4].children[1].children[1].children[0].value
        // se debe pasar como parametro el email del usuario a consultar
        // si el usuario no existe regresa un error

      },
      function (code, result) {
        if (code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Producto añadido correctamente'

          })
        } else {
          let text
          if (code === 404) { text = 'Fallo al conectar con el servidor' } else if (result.stock !== undefined) { text = result.descripcion + ' , Stock actual:' + result.stock } else { text = result.message }
          Swal.fire({
            title: 'Oops...',
            text: text,
            icon: 'error',
            confirmButtonText: 'Okey'
          })
        }
      })
  }
  return (
    <Div>
      <P>
        {id}
      </P>
      <Img src={'data:image/jpeg;base64,' + foto} />
      <Description>{descripcion}</Description>
      <Precio>{precio}</Precio>
      <Botones>
        <BotonComprar onClick={handleClick}><AddIcon />Comprar</BotonComprar>
        <TextField defaultValue='1' label='Cantidad' type='number' min='1' inputProps={inputProps} focused />
      </Botones>
    </Div>
  )
}
