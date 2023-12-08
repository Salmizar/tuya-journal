import styled from "styled-components";
const theme = {
  enabled: {
      outline: 'solid',
      background: '#fff'
  },
  disabled: {
    outline: 'none',
    background: '#f6f6f6'
  }
};
export const TextArea = styled.textarea`
  background-color: ${(props) => theme[props.theme].background};
  padding: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  border: 1px solid #dcdcdc;
  &:focus {
    outline: ${(props) => theme[props.theme].outline};
  }
  &:disabled {
    background-color: ${(props) => theme['disabled'].background};
    outline: ${(props) => theme['disabled'].outline};
  }
`

TextArea.defaultProps = {
  theme: 'enabled'
}