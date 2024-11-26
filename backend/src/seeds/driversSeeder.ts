import { pool } from "../database";
import { DriverRow } from "../interfaces/rideInterfaces";

const drivers: DriverRow[] = [
    {
        id: 1,
        name: "Homer Simpson",
        description:
            "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        rating: 2.0,
        comment: "Motorista divertido, mas um pouco distraído.",
        km_tax: 2.5
    },
    {
        id: 2,
        name: "Dominic Toretto",
        description:
            "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        vehicle: "Dodge Charger R/T 1970 modificado",
        rating: 4.0,
        comment: "Ótimo motorista, sempre no controle.",
        km_tax: 5.0
    },
    {
        id: 3,
        name: "James Bond",
        description:
            "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        vehicle: "Aston Martin DB5 clássico",
        rating: 5.0,
        comment: "Experiência de viagem inigualável.",
        km_tax: 10.0
    }
];

const validateDriver = (driver: DriverRow): boolean => {
    return (
        typeof driver.name === "string" &&
        typeof driver.description === "string" &&
        typeof driver.vehicle === "string" &&
        typeof driver.rating === "number" &&
        typeof driver.comment === "string" &&
        typeof driver.km_tax === "number"
    );
};

const seedDrivers = async () => {
    try {
        for (const driver of drivers) {
            // Realiza a consulta no banco de dados
            const [existingDrivers] = await pool.query(
                "SELECT * FROM drivers WHERE id = ?",
                [driver.id]
            );

            // Converte os dados para DriverRow explicitamente
            const driversFromDb = existingDrivers as DriverRow[];

            if (driversFromDb.length === 0) {
                if (validateDriver(driver)) {
                    await pool.query(
                        "INSERT INTO drivers (id, name, description, vehicle, rating, comment, km_tax) VALUES (?, ?, ?, ?, ?, ?, ?)",
                        [
                            driver.id,
                            driver.name,
                            driver.description,
                            driver.vehicle,
                            driver.rating,
                            driver.comment,
                            driver.km_tax
                        ]
                    );
                } else {
                    console.error("Driver validation failed:", driver);
                }
            } else {
                console.log(
                    `Driver with ID ${driver.id} already exists. Skipping...`
                );
            }
        }
        console.log("Drivers seeded successfully!");
    } catch (error) {
        console.error("Error seeding drivers:", error);
    }
};

export { seedDrivers };
