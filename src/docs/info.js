export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API E-Commerce",
            version: "0.1a",
            description: "Documentacion de API para un Ecommerce que cuenta con endpoints para para crear, actualizar y eliminar productos, carros de compra y usuarios de dicho ecomerce",
        },
        servers: [
            {
                url: "http://localhost:8080",
            }
        ],
    },
    apis: ["./src/docs/*/*.yaml"],
};