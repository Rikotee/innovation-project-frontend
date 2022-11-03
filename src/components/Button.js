import styled from 'styled-components'


export const Button = styled.button`
    border: 1px solid #616A94;
    border-radius: 20px;
    padding: 5px 10px;
    margin: 5px;
    text-decoration: none;
    color: #616A94;
    background-color: #999;
    font-size: 1em;
    cursor: pointer;
    outline: none;

    &:hover {
        color: white;
        background-color: #616A94;
    }

    @media only screen and (max-width: 600px) {
        border: 1px solid #616A94;
        border-radius: 0px;
        padding: 5px 10px;
        margin: 5px;
        text-decoration: none;
        color: #616A94;
        background-color: #654;
        font-size: 0.5em;

      


    
        &:hover {
            color: white;
            background-color: #616A94;
        }

    }
`;

export default Button