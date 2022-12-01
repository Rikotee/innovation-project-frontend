import styled from 'styled-components'


export const LogOutButton = styled.button`
    border: 1px solid black;
    border-radius: 20px;
    padding: 4px 7px;
    margin-top: 10px;
    margin-right: 10px;
    text-decoration: none;
    color: black;
    background-color: white;
    transition: 0.3s;
    font-size: 0,1em;
    cursor: pointer;
    outline: none;

    &:hover {
        color: white;
        background-color: #616A94;
    }
`;

export default LogOutButton
