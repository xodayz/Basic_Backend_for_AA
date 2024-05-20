import express, { Request, Response } from 'express';
import "reflect-metadata"

const app = express()

app.use(express.json()); // middleware
app.use('/', express.static('public')); // middleware

type User = {
    id: number,
    username: string,
    fullname: string
}
const users: User[] = []

// endpoint

app.get('/users', (request: Request, response: Response) => {
    response.status(200).json(users)
});

app.get('/users/:id', (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const user = users.find((u: User) => u.id === id);

    if (isNaN(id) || id <= 0 || id > users.length) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El ID digitado no es válido: ${id}`
        });
    }

    response.json({
        statusCode: 200,
        statusValue: 'Ok',
        data: user
    });
});

app.post('/users', (request: Request, response: Response) => {
    const { username, fullname } = request.body;

    if (!username) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El campo username es requerido`
        })
    }

    if (!fullname) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El campo fullname es requerido`
        })
    }

    const repetido = users.find((u: User) => u.username === username);
    if (repetido) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El username ${username} ya existe`
        })
    }

    const newUser = {
        id: users.length + 1,
        username,
        fullname
    }
    users.push(newUser);
    response.status(201).json(newUser);
})

app.put('/users/:id', (request: Request, response: Response) => {
    const id = request.params.id;
    const { username, fullname } = request.body;

    if(isNaN(Number.parseInt(id))){
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `ID: ${id} no es un numero.`
        })
    }

    if (!username || !fullname) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El campo username/fullname es requerido.`
        })
    }

    const existe = users.find((u: User) => u.id === Number.parseInt(id));

    if (!existe) {
        return response.status(404).json({
            statusCode: 404,
            statusValue: 'Not Found',
            message: `Usuario ${username} no encontrado.`
        })
    }

    const yaesta = users.find((u: User) => u.username === username)

    if (existe?.id !== Number.parseInt(id) && existe?.username === username) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Not Found',
            message: `Usuario "${username}" ya existe.`
        })
    }


    existe.username = username;
    existe.fullname = fullname;
    response.status(200).json({
        statusCode: 200,
        statusValue: 'OK',
        message: `Usuario '${username}' ha sido actualizado exitosamente.`
    })
})

app.delete('/users/:id', (request: Request, response: Response) => {
    const { id } = request.body;
    const user = users.find((u: User) => u.id === parseInt(id));

    if (isNaN(id) || id <= 0 || id > users.length) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El ID digitado no es válido: ${id}`
        });
    }

    if (!user) {
        return response.status(400).json({
            statusCode: 400,
            statusValue: 'Bad Request',
            message: `El ID:  ${id} no fue encontrado.`
        })
    }

    const userID = users.findIndex((u: User) => u.id === parseInt(id));
    users.splice(userID, 1);
    response.status(201).json({
        statusCode: 201,
        statusValue: 'OK',
        message: `El ID:  ${id} ha sido eliminado exitosamente.`
    })
})

const port = 3000;
app.listen(port, () => console.log(`Server running at localhost:${port}`));