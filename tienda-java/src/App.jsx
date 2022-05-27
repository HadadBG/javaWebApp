import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Header } from './components/Header'
import { GlobalStyle } from './GlobalStyles'
import { Compra } from './components/Compra'
import { Card } from './components/Card'
import { Carrito } from './components/Carrito'
function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export function App () {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <GlobalStyle />
      <Header>
        <Tabs sx={{ height: '100%', width: '100%' }} value={value} onChange={handleChange} aria-label='basic tabs example'>
          <Tab label='Comprar articulo' {...a11yProps(0)} sx={{ width: '25%', maxWidth: 'none', height: '100%' }} />
          <Tab label='Captura articulo' {...a11yProps(1)} sx={{ width: '25%', maxWidth: 'none', height: '100%' }} />
          <Tab label='Carrito de compra' {...a11yProps(2)} sx={{ width: '25%', maxWidth: 'none', height: '100%' }} />
        </Tabs>
      </Header>

      <TabPanel value={value} index={0}>
        <Compra />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Card />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Carrito />
      </TabPanel>
    </>
  )
}
