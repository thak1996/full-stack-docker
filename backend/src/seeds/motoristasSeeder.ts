import pool from "../database";

const drivers = [
    {
        nome: "Homer Simpson",
        descricao:
            "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        carro: "Plymouth Valiant 1973 rosa e enferrujado",
        avaliacao: 2.0,
        taxa_km: 2.5
    },
    {
        nome: "Dominic Toretto",
        descricao:
            "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        carro: "Dodge Charger R/T 1970 modificado",
        avaliacao: 4.0,
        taxa_km: 5.0
    },
    {
        nome: "James Bond",
        descricao:
            "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        carro: "Aston Martin DB5 clássico",
        avaliacao: 5.0,
        taxa_km: 10.0
    }
];

const seedDrivers = async () => {
    try {
        for (const driver of drivers) {
            await pool.query(
                "INSERT INTO motoristas (nome, descricao, carro, avaliacao, taxa_km) VALUES (?, ?, ?, ?, ?)",
                [
                    driver.nome,
                    driver.descricao,
                    driver.carro,
                    driver.avaliacao,
                    driver.taxa_km
                ]
            );
        }
        console.log("Motoristas seeded successfully!");
    } catch (error) {
        console.error("Error seeding motoristas:", error);
    }
};

seedDrivers();
