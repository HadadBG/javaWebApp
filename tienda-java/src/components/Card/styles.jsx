import styled from 'styled-components'
export const Stock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    & input{
        -webkit-appearance: auto;
        -moz-appearance: auto;
    }
    height: 9vh;
`
export const Div = styled.div`
    background-color:aliceblue;
    margin: 5vh auto 5vh auto;
    height: calc( 85vh - 5rem);
    display: flex;
    width:35%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 5rem;
`
export const Precio = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 9vh;
`
export const Label = styled.p`
    color:#d21976;
    font-size: 1.5rem;
   font-weight: 700;
`
export const Input = styled.input`
    -webkit-appearance: none;
    -moz-appearance: textfield;
    border-radius: 5rem;
    border:1px solid #d21976;
    padding:0 1rem ;
    text-align: center;
    color:#d21976;
    outline:none;
    font-size: 1.5rem;
    font-weight: 700;
    width: 30%;
    height:5vh;
    background-color: #f9e2ee;
    
`
export const Svg = styled.svg`
    width: 60%;
    filter: invert(77%) sepia(36%) saturate(2983%) hue-rotate(41deg) brightness(100%) contrast(81%);
    
`
export const IconContainer = styled.div`
    
    border-radius: 50%;
    width:12vh;
    height: 12vh;
    margin: 0 auto;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
    margin-bottom: 1rem;
    position: relative;
   

`
export const Button = styled.button`
    display: flex;
    align-items: center;
    margin-bottom: 5vh;
    height: 5vh;
    border-radius: 5rem;
    background-color:#ddf4c6 ;
    border: 2px solid #76d219;
    width: 30%;
    justify-content: center;
    gap:1rem;
    font-size: 1.5rem;
    color:#76d219;
    &:hover{
        cursor:pointer;
    }
`
export const Imagen = styled.img`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: none;
`
export const LabelInput = styled.label`
    position: absolute;
    z-index:3;
    width:  100% ;
    height: 100% ;
    background-color: transparent;
    border-radius: 50%;
    &:hover{
        cursor: pointer;
    }
`
export const DivInput = styled.div`
    border:0.5rem solid #76d219;
    position:absolute;
    z-index: 1;
    margin: auto;
    top:-0.25rem;
    left: -0.25rem;
    border-radius: 50%;
    width: calc( 100% - 0.5rem);
    height: calc(100% - 0.5rem);
    display: flex;
    align-items: center;
    justify-content: center;
   
  
`
