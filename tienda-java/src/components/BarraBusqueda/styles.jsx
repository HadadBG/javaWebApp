import styled from 'styled-components'

export const Div = styled.div`
  display: flex;
  border: 1px solid;
  border-color:#1976d2;
  height: 3rem;
  width: 45%;
  justify-content: space-between;
  background-color: #e2eef9;
  border-radius:5rem;
  position: relative;
  margin: 3rem auto;
  
`
export const Input = styled.input`
   background-color: transparent;
   border: none;
   width:calc( 100% - 8rem );
   padding-left:2rem ;
   font-size: 1.3rem;
   color:#1976d2;
   &:focus{
       outline:none;
   } 
`
export const Button = styled.button`
    border:1px solid #d21976;
    background-color: #f9e2ee;
    position: absolute;
    top:-1px;
    right: -1px;
    width: 4rem;
    height:calc( 100% + 2px );
    border-bottom-right-radius :5rem ;
    border-top-right-radius : 5rem ;
    &:hover{
        cursor: pointer;
    }

`
export const Svg = styled.svg`
    width: 25px;
    height: 25px; 
    filter: invert(17%) sepia(65%) saturate(4688%) hue-rotate(317deg) brightness(90%) contrast(92%);

`
