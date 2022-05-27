import styled from 'styled-components'

export const Div = styled.div`
    height: 70vh  ;
    overflow: auto;
    width: 80%;
    margin: 5vh auto 2.5vh auto;
   -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
export const Tabla = styled.table`
    border-collapse:collapse;
    font-size: 1.3rem;
    width: 100%;
`
export const Row = styled.tr`
    border-bottom: 1px solid #1976d2;
    height: 5vh;
    color:#d21976;
`
export const Header = styled.th`
`
export const Total = styled.div`
    height: 9vh;
    width:80%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    color: #d21976;
    font-size: 1.5rem;
    font-weight: 700;
    
`
export const Label = styled.p`
    margin: 0 6rem;
`
export const Cantidad = styled.p`
    margin: 0 6rem;
    &:before{
        content: "$";
    }
`
