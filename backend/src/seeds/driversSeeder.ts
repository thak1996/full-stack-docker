import { pool } from "../database";

const drivers = [
    {
        name: "Homer Simpson",
        description:
            "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        car: "Plymouth Valiant 1973 rosa e enferrujado",
        avaliation: 2.0,
        km_tax: 2.5
    },
    {
        name: "Dominic Toretto",
        description:
            "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        car: "Dodge Charger R/T 1970 modificado",
        avaliation: 4.0,
        km_tax: 5.0
    },
    {
        name: "James Bond",
        description:
            "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        car: "Aston Martin DB5 clássico",
        avaliation: 5.0,
        km_tax: 10.0
    }
];

const seedDrivers = async () => {
    try {
        for (const driver of drivers) {
            await pool.query(
                "INSERT INTO drivers (name, description, car, avaliation, km_tax) VALUES (?, ?, ?, ?, ?)",
                [
                    driver.name,
                    driver.description,
                    driver.car,
                    driver.avaliation,
                    driver.km_tax
                ]
            );
        }
        console.log("Motoristas seeded successfully!");
    } catch (error) {
        console.error("Error seeding motoristas:", error);
    }
};

export { seedDrivers };
