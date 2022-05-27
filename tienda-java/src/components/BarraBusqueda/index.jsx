import React from 'react'
import { Div, Button, Input } from './styles'
import { SearchIcon } from './SearchIcon'

export const BarraBusqueda = ({ setBusqueda }) => {
  function handleButtonClick () {
    setBusqueda(document.getElementById('input_busqueda').value)
  }
  return (
    <Div>
      <Input id='input_busqueda' placeholder='Buscar Articulo' />
      <Button onClick={() => handleButtonClick()}>
        <SearchIcon />
      </Button>
    </Div>
  )
}
