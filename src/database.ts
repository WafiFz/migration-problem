// import { DataSource } from "typeorm";
// import { Books } from "./entity/Books";
// import { Categories } from "./entity/Categories";
// import { Users } from "./entity/Users";
// import { Writers } from "./entity/Writers";

import { DataSource } from "typeorm";
import { Books } from "./entity/Books";
import { Categories } from "./entity/Categories";
import { Users } from "./entity/Users";
import { Writers } from "./entity/Writers";


export const Database = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 7000,
    username: "postgres",
    password: "docheck",
    database: "latihan",
    synchronize: false,
    logging: false,
    entities: [Books, Writers, Categories, Users],
    migrations: ['src/migration/*.ts'],
    subscribers: [''],
})

// export const Database = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "me",
//     password: "password",
//     database: "api",
//     synchronize: false,
//     logging: false,
//     entities: [Books, Writers, Categories, Users],
//     migrations: ['src/migration/*.ts'],
//     subscribers: [''],
// })
