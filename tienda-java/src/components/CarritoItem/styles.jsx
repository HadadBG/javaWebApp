import styled from 'styled-components'
export const P = styled.td`
    display: none;
`
export const DivBorrar = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    z-index:20;
    top:0;
    right: 0;
    &:hover{
        cursor: pointer;
    }
`
export const Row = styled.tr`
    border-bottom: 1px solid #1976d2;
    color:#1976d2;
    &:nth-child(odd){
        background-color: aliceblue ;
    }
   
`
export const Accion = styled.td`
    width: 7.5%;
    height: 15vh;
`
export const TdFoto = styled.td`  
    width: 17.5%;
    height: 15vh;
    
`
export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center; 
`
export const Foto = styled.img`
    width: 10vh;
    border-radius: 50%;
    height: 10vh;

`
export const Description = styled.td`
    text-align: center;
    width: 30%;
`
export const Cantidad = styled.td`
    text-align: center;
    width: 15%;
`
export const Precio = styled.td`
    text-align: center;
    width: 15%;
    &:before{
        content: "$";
    }
`
export const Costo = styled.td`
    text-align: center;
    width: 15%;
    &:before{
        content: "$";
    }
`
export const Svg = styled.svg`
    width: 30px;
    height: 30px; 
    position: absolute;
    z-index: 0;
    top: 0;
    right: 0;
    filter: invert(17%) sepia(65%) saturate(4688%) hue-rotate(317deg) brightness(90%) contrast(92%);
`
