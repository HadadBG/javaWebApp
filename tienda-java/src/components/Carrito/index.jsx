import React, { useEffect, useState } from 'react'
import { CarritoItem } from '../CarritoItem'
import { Header, Row, Tabla, Cantidad, Label, Total, Div } from './styles'
import { WSClient } from '../../WSClient'
import Swal from 'sweetalert2'
export const Carrito = () => {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [actualiza, setActualiza] = useState(false)
  function seEliminoItem () {
    setActualiza(!actualiza)
  }
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador

    const cliente = new WSClient('/Servicio/rest/ws')
    cliente.post('get_carrito',
      {
        // se debe pasar como parametro el email del usuario a consultar
        // si el usuario no existe regresa un error

      },
      function (code, result) {
        if (code === 200) {
          setTotal(0)
          let aux = 0
          setItems(result.map((item) => {
            item.costo = item.stock * item.precio
            aux += item.costo
            return item
          }))
          setTotal(aux)
        } else {
          let text
          if (code === 404) { text = 'Fallo al conectar con el servidor' } else { text = result }
          Swal.fire({
            title: 'Oops...',
            text: text,
            icon: 'error',
            confirmButtonText: 'Okey'
          })
        }
      }

    )
  }, [actualiza])
  return (
    <>
      <Div>
        <Tabla>
          <thead>
            <Row>
              <Header>Accion</Header>
              <Header>Foto</Header>
              <Header>Descripcion</Header>
              <Header>Cantidad</Header>
              <Header>Precio</Header>
              <Header>Costo</Header>
            </Row>
          </thead>
          <tbody>
            {items.map(item => <CarritoItem key={item.id} item={item} seEliminoItem={seEliminoItem} />)}
          </tbody>
        </Tabla>
      </Div>
      <Total>
        <Label>Total</Label>
        <Cantidad>{total}</Cantidad>
      </Total>
    </>
  )
}
