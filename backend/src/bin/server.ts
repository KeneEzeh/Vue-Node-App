import dotenv from "dotenv";
dotenv.config();
import "colors"
import { createServer } from "node:http";
import app, { port } from "../app";
import sequelize from "../db";

const server = createServer(app);


sequelize.sync({}).then(() => {
	console.log("Connected to MySql".bgYellow.bold);
    server.listen(port, () => {
        console.log(`Server running on port: ${port} `.bgGreen.bold);
    });
});
