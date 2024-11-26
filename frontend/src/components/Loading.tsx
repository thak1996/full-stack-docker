import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
    color: #007bff;
`;

const Loading: React.FC = () => {
    return (
        <LoadingContainer>
            <h1>Loading...</h1>
        </LoadingContainer>
    );
};

export default Loading;
