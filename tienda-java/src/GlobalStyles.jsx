import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        background-color: white;
    }   
    .MuiTabs-flexContainer{
        height: 100%;
        width: 100%;
    }
    .MuiBox-root{
        padding: 0;
    }
    .MuiOutlinedInput-input{
        text-align: center;
        color: #1976d2 !important;
    }
    .MuiOutlinedInput-root{
        border-radius: 20px !important;    
    }
    .MuiOutlinedInput-root textarea{
        height:100% !important;
        font-size: 1.5rem;
        padding: 0 5rem;
    }
    .MuiOutlinedInput-root{
        height:100% !important;
    }
`
