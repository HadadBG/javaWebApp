import React from 'react'
import { DivBorrar, Cantidad, Costo, Description, Foto, Precio, Row, TdFoto, Accion, ImageContainer, P } from './styles'
import { DeleteIcon } from './DeleteIcon'
import Swal from 'sweetalert2'
import { WSClient } from '../../WSClient'
export const CarritoItem = ({ item = {}, seEliminoItem }) => {
  const { id, descripcion, precio, stock, foto, costo } = item
  function handleClick (e) {
    const container = e.target.parentElement.parentElement.parentElement.parentElement
    const cliente = new WSClient('/Servicio/rest/ws')
    cliente.post('elimina_carrito',
      {
        id_articulo: container.children[0].innerHTML,
        cantidad: container.children[4].innerHTML
        // se debe pasar como parametro el email del usuario a consultar
        // si el usuario no existe regresa un error

      },
      function (code, result) {
        if (code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Articulo eliminado Correctamente'

          })
          seEliminoItem()
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
      })
  }
  return (
    <Row>
      <P>{id}</P>
      <Accion>
        <ImageContainer>
          <div style={{ position: 'relative', width: '30px', height: '30px' }}>
            <DivBorrar onClick={handleClick} />
            <DeleteIcon />
          </div>
        </ImageContainer>
      </Accion>
      <TdFoto>
        <ImageContainer>
          <Foto src={'data:image/jpeg;base64,' + foto} />
        </ImageContainer>
      </TdFoto>
      <Description>
        {descripcion}
      </Description>
      <Cantidad>
        {stock}
      </Cantidad>
      <Precio>
        {precio}
      </Precio>
      <Costo>{costo}</Costo>
    </Row>
  )
}
