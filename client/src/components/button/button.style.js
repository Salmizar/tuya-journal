import styled from "styled-components";
const theme = {
    blue: {
        color: 'white',
        active_color: "white",
        default: '#4285f4',
        hover: '#5693f5',
        active: '#3e84f4'
    },
    black: {
        color: 'white',
        active_color: "white",
        default: '#000000',
        hover: '#1a1a1a',
        active: '#000000'
    },
    blue_inactive: {
        color: 'black',
        active_color: "white",
        default: '#c1d8ff',
        hover: '#4285f4',
        active: '#4285f4'
    },
    green: {
        color: 'white',
        active_color: "white",
        default: 'green',
        hover: '#019601',
        active: 'green'
    },
    phgreen: {
        color: 'white',
        active_color: "white",
        default: '#96c300',
        hover: '#9ccb02',
        active: '#96c300'
    },
    red: {
        color: 'white',
        active_color: "white",
        default: '#CF4307',
        hover: '#de4809',
        active: '#CF4307'
    },
    yellow: {
      color: 'white',
      active_color: "white",
      default: '#ffc82c',
      hover: '#fbd873',
      active: '#ffc82c'
    },
    gray: {
      color: 'white',
      active_color: "white",
      default: 'gray',
      hover: '#8b8a8a',
      active: 'gray'
    },
    lightgray: {
      color: 'white',
      active_color: "white",
      default: 'lightgray',
      hover: '#dedddd',
      active: 'lightgray'
    }
};
export const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: ${(props) => theme[props.theme].color};
  border-radius: 7px;
  margin-bottom: 10px;
  font-size: 18px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  cursor: pointer;
  padding: 10px 25px 10px 25px;
  border: 1px solid #d0d0d0;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
    color: ${(props) => theme[props.theme].active_color};
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