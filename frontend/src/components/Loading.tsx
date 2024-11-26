import React from "react";
import styled from "styled-components";

const LoaderOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Garante que o loader fique acima de outros elementos */
`;

const Spinner = styled.div`
    border: 8px solid #f3f3f3; /* Cor do fundo do círculo */
    border-top: 8px solid #3498db; /* Cor do círculo giratório */
    border-radius: 50%;
    width: 50px; /* Tamanho do círculo */
    height: 50px; /* Tamanho do círculo */
    animation: spin 1s linear infinite; /* Animação de rotação */

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loading: React.FC = () => {
    return (
        <LoaderOverlay>
            <Spinner />
        </LoaderOverlay>
    );
};

export default Loading;
