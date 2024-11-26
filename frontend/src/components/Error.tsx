import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
    font-size: 0.5rem;
    color: black;
    text-align: center;
    padding: 20px;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 60%;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    &:active {
        background-color: #004494;
    }
`;

const Error: React.FC<{ message: string; onClose: () => void }> = ({
    message,
    onClose
}) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <ErrorContainer>
                    <h1>{message}</h1>
                </ErrorContainer>
                <Button onClick={onClose}>OK</Button>
            </ModalContent>
        </ModalOverlay>
    );
};

export default Error;
