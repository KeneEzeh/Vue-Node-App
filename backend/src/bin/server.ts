import dotenv from "dotenv";
dotenv.config();
import { createServer } from "node:http";
import app, { port } from "../app";
import sequelize from "../db";

const server = createServer(app);


sequelize.sync({force:true}).then(() => {
	console.log("Connected to MySql");
    server.listen(port, () => {
        console.log(`Server running on port: ${port} `);
    });
});
