import React from 'react'
import { Div, Logo, Tabs } from './styles'
export const Header = ({ children }) => {
  return (
    <Div>
      <Logo>My<span>Carrito</span></Logo>
      <Tabs>
        {children}
      </Tabs>
    </Div>
  )
}
