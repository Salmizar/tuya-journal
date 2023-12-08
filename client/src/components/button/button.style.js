import styled from "styled-components";
const theme = {
    blue: {
        default: '#4285f4',
        hover: '#5693f5',
        active: '#3e84f4'
    },
    black: {
        default: '#000000',
        hover: '#1a1a1a',
        active: '#000000'
    }
};
export const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 10px;
  border-radius: 7px;
  margin-bottom: 10px;
  font-size: 18px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:active {
    background-color: ${(props) => theme[props.theme].active};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`
Button.defaultProps = {
    theme: 'blue'
}