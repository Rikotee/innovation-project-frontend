import styled from 'styled-components'


export const LogOutButton = styled.button`
    border: 1px solid #616A94;
    border-radius: 20px;
    padding: 4px 7px;
    margin-top: 5px;
    margin-right: 10px;
    text-decoration: none;
    color: #616A94;
    background-color: #fb9725;
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
