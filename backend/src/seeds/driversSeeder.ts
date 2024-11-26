import { pool } from "../database";
import { DriverRow } from "../interfaces/rideInterfaces";

const drivers: Omit<DriverRow, "id">[] = [
    {
        name: "Homer Simpson",
        description:
            "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        review: {
            rating: 2.0,
            comment: "Motorista divertido, mas um pouco distraído."
        },
        value: 2.5
    },
    {
        name: "Dominic Toretto",
        description:
            "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        vehicle: "Dodge Charger R/T 1970 modificado",
        review: {
            rating: 4.0,
            comment: "Ótimo motorista, sempre no controle."
        },
        value: 5.0
    },
    {
        name: "James Bond",
        description:
            "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        vehicle: "Aston Martin DB5 clássico",
        review: {
            rating: 5.0,
            comment: "Experiência de viagem inigualável."
        },
        value: 10.0
    }
];

const validateDriver = (driver: Omit<DriverRow, "id">): boolean => {
    return (
        typeof driver.name === "string" &&
        typeof driver.description === "string" &&
        typeof driver.vehicle === "string" &&
        typeof driver.review.rating === "number" &&
        typeof driver.review.comment === "string"
    );
};

const seedDrivers = async () => {
    try {
        for (const driver of drivers) {
            if (validateDriver(driver)) {
                await pool.query(
                    "INSERT INTO drivers (name, description, car, avaliation, km_tax) VALUES (?, ?, ?, ?, ?)",
                    [
                        driver.name,
                        driver.description,
                        driver.vehicle,
                        driver.review.rating,
                        driver.value
                    ]
                );
            } else {
                console.error("Driver validation failed:", driver);
            }
        }
        console.log("Motoristas seeded successfully!");
    } catch (error) {
        console.error("Error seeding motoristas:", error);
    }
};

export { seedDrivers };
