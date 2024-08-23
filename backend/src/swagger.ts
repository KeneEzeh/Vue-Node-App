import { Express, Request, Response} from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import packageJson from '../package.json';
import fs from 'fs';


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "TweetAI API",
        description:
          "API documentation for the TweetAI platform.",
        version: packageJson.version
      },
      components: {
        schemas: {
          Autobot: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Autobot ID',
              },
              name: {
                type: 'string',
                description: 'Autobot name',
              },
              username: {
                type: 'string',
                description: 'Autobot username',
              },
              email: {
                type: 'string',
                description: 'Autobot email',
              },
              phone: {
                type: 'string',
                description: 'Autobot phone number',
              }
            },
            example: {
              id: '1',
              name: 'John Doe',
              username: 'johndoe',
              email: 'johndoe@example.com',
              phone: '08012345678',
            },
          },
          Post: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Post ID',
              },
              title: {
                type: 'string',
                description: 'Post title',
              },
              body: {
                type: 'string',
                description: 'Post body',
              },
              autobotId: {
                type: 'string',
                description: 'ID of the Autobot who created the post',
              },
            },
            example: {
              id: '1',
              title: 'Autobot Post',
              body: 'This is a sample post created by an Autobot.',
              autobotId: '1',
            },
          },
          Comment: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Comment ID',
              },
              body: {
                type: 'string',
                description: 'Comment text',
              },
              postId: {
                type: 'string',
                description: 'ID of the post this comment belongs to',
              },
            },
            example: {
              id: '1',
              body: 'This is a sample comment.',
              postId: '1',
            },
          },
        },
    },
    },
    apis: ['./src/routes/index.ts']
  };
  
  const swaggerSpec = swaggerJSDoc(options);

//   UNCOMMENT THIS TO GENERATE A SWAGGER.JSON FILE
//   fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
  
  function swaggerDocs(app: Express, port: any) {
    // SWAGGER DOCS ROUTE
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
    // THE DOCS.JSON FILE IS GENERATED AND CAN BE ACCESSED VIA THE /DOCS.JSON ROUTE
    app.get("/docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  
    console.log(`Docs available locally at http://localhost:${port}/docs`);
  }
  
  export default swaggerDocs;
  