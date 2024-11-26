import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
    font-size: 0.5rem;
    color: black;
`;

const Error: React.FC<{ message: string }> = ({ message }) => {
    return (
        <ErrorContainer>
            <h1>{message}</h1>
        </ErrorContainer>
    );
};

export default Error;
