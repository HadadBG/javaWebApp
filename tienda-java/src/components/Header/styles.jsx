import styled from 'styled-components'

export const Div = styled.div`
  display: flex;
  border: 1px solid;
  border-color:rgba(0, 0, 0, 0.12);
  height: 10vh;
  padding-left: 5rem;
`
export const Logo = styled.h1`
    width:40%;
    margin: auto 0;
    font-size: 2.4rem;
    color: #d21976;
    font-weight: 400;
    font-style: italic;
    & span{
    font-family: 'Fira Sans', sans-serif;
    font-style: normal;
    font-weight: 900;
    color: #1976d2;
  }
    
`
export const Tabs = styled.div`
  height: 100%;
  width:60%;
  display: flex;
  justify-content: center;
`
