import { TextField } from '@mui/material'
import React from 'react'
import { DivInput, LabelInput, Imagen, Div, Input, Label, Precio, IconContainer, Button, Stock } from './styles'
import { AddImageIcon } from './AddImageIcon'
import { AddIcon } from './../Article/AddIcon'
import { WSClient } from '../../WSClient'
import Swal from 'sweetalert2'
export const Card = () => {
  let foto = null
  function readSingleFile (event, imagen) {
    const files = event.target.files

    if (files === null || files === undefined) return
    const file = files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = function (e) {
      imagen.src = reader.result
      imagen.style.display = 'unset'
      // reader.result incluye al principio: "data:image/jpeg;base64,"
      foto = reader.result.split(',')[1]
    }
    reader.readAsDataURL(file)
  }
  function handleAgregar () {
    const cliente = new WSClient('/Servicio/rest/ws')
    cliente.post('alta_articulo',
      {
        articulo: {
          descripcion: document.getElementById('descripcion').value,
          precio: document.getElementById('precio').value,
          stock: document.getElementById('stock').value,
          foto: foto
        // se debe pasar como parametro el email del usuario a consultar
        // si el usuario no existe regresa un error
        }
      },
      function (code, result) {
        if (code === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Producto Agregado Correctamente'

          })
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
    <Div>
      <IconContainer>
        <LabelInput htmlfor='upload'>
          <input type='file' id='upload' style={{ display: 'none' }} onChange={(event) => readSingleFile(event, document.getElementById('input_imagen'))} multiple={false} accept='image/*' />
        </LabelInput>
        <Imagen id='input_imagen' />
        <DivInput>
          <AddImageIcon />
        </DivInput>
      </IconContainer>
      <TextField label='Descripcion' multiline sx={{ height: '20vh', width: '70%' }} focused id='descripcion' />
      <Precio>
        <Label> Precio: $ </Label>
        <Input type='number' id='precio' />
      </Precio>
      <Stock>
        <Label> Stock: </Label>
        <Input type='number' id='stock' />
      </Stock>
      <Button onClick={handleAgregar}> <AddIcon /> Agregar </Button>
    </Div>
  )
}
