import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  border-width: 0.4rem;
  border-style: solid;
  border-color: gray gray gray gray;
  width: 90px;
  height: 100px;
  border-radius: 20%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before {
    content: "Loading \ 0.0";
    position: absolute;
    left: 13px;
    top: 40px;
    text-align: center;
    width: 50px;
    font-size: 11px;
  }

  &:after {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 27px;
    top: 10px;
    background: darkgray;
    position: absolute;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

//Create functional component
export function LoadingSpinner() {

    return (
        <Container>
            <Loader />
        </Container>
    );

}