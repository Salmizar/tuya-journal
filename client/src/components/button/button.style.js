import styled from "styled-components";
import * as Utils from '../../utils';
export const Button = styled.button`
  background-color: ${(props) => Utils.Theme.theme[props.theme].default};
  color: ${(props) => Utils.Theme.theme[props.theme].color};
  border-radius: 7px;
  margin-bottom: 10px;
  font-size: 18px;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  cursor: pointer;
  padding: 10px 25px 10px 25px;
  border: 1px solid #d0d0d0;
  &:hover {
    background-color: ${(props) => Utils.Theme.theme[props.theme].hover};
    color: ${(props) => Utils.Theme.theme[props.theme].active_color};
  }
  &:active {
    background-color: ${(props) => Utils.Theme.theme[props.theme].active};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`
Button.defaultProps = {
    theme: 'blue'
}