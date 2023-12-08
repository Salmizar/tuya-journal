import styled from "styled-components";
const theme = {
  enabled: {
    outline: 'solid',
    background: '#fff',
    outlineColor: '#000'
  },
  error: {
    outline: 'solid',
    background: '#ffe6e6',
    outlineColor: '#FF0000'
  },
  disabled: {
    outline: 'none',
    background: '#f6f6f6',
    outlineColor: '#000'
  }
};
export const Input = styled.input`
  background-color: ${(props) => theme[props.theme].background};
  outline-color: ${(props) => theme[props.theme].outlineColor};
  padding: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  border: 1px solid #dcdcdc;
  &:focus {
    outline: ${props => (props.type !== 'checkbox' ? theme[props.theme].outline : theme['disabled'].outline)};
    outline-color: ${props => (props.type !== 'checkbox' ? theme[props.theme].outlineColor : theme['disabled'].outlineColor)};
  }
  &:disabled {
    outline-color: ${(props) => theme['disabled'].outlineColor};
    background-color: ${(props) => theme['disabled'].background};
    outline: ${(props) => theme['disabled'].outline};
  }
`

Input.defaultProps = {
  theme: 'enabled'
}