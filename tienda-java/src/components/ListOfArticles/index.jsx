import React from 'react'
import { Grid } from './styles'
import { Article } from '../Article'
export const ListOfArticles = ({ articulos = [] }) => {
  return (
    <Grid>
      {articulos.map(article => <Article key={article.id} article={article} />)}
    </Grid>

  )
}
