import styled from 'styled-components'
export const P = styled.p`
    display: none;
`
export const Div = styled.div`
    background-color:aliceblue;
    width: 100%;
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`
export const Img = styled.img`
    border-radius: 50%;
    width: 50%;
    margin: 2rem auto 0 auto;
`
export const Description = styled.p`
    width: 70%;
    text-align: justify;
    font-size: 1.2rem;
    color:#1976d2;
`
export const Botones = styled.div`
    display:flex;
    margin-bottom: 2rem;
    width: 70%;
    justify-content: center;
    
`
export const BotonComprar = styled.button`
   margin-right: 1rem;
   border: 3px solid #76d219;
   background-color: #ddf4c6;
   border-radius: 2rem;
   padding: 0 1.5rem;
   color: #76d219;
   font-weight: 700;
   display: flex;
   align-items: center;
   gap: 0.5rem;
   &:hover{
       cursor: pointer;
   }
`
export const Precio = styled.p`
    text-align: right;
    width: 70%;
    font-size: 1.4rem;
    font-weight: 700;
    &:after{
        content: '$';
    }
    color: #d21976;
`
export const Svg = styled.svg`
    width: 25px;
    height: 25px;
    filter: invert(77%) sepia(36%) saturate(2983%) hue-rotate(41deg) brightness(100%) contrast(81%);
`
