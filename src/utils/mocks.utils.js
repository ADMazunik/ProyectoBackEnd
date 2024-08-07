import { fakerES as faker } from "@faker-js/faker"

export const userGenerator = () => {
    return {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 85 }),
        role: "user"
    }
}

export const productGenerator = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        code: faker.number.int({ min: 13577, max: 99999 }),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 99, max: 9999 }),
        thumbnail: faker.image.urlLoremFlickr({ category: 'business' }),
        status: true

    }
}