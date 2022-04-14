import express from 'express';
import 'dotenv/config';
import * as path from 'path';
import { createConnection } from 'typeorm';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import entities from './models/index.js';
import {
  login,
  logout,
  postLogin,
  postRegister,
  register,
} from './controllers/authentication.js';
import validationAuthentication from './middleware/validation/authentication.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import { home } from './controllers/home.js';
import { SOURCE_PATH } from './consts.js';
import { jwtAuth } from './middleware/jwtAuth.js';
import swaggerDefinition from './docs/swagger.js';
import { deleteUser, getUser, getUsers } from './controllers/api/user.js';
import {
  deleteArtist,
  getArtists,
  postArtist,
  putArtist,
} from './controllers/api/artist.js';
import {
  deletesong,
  getsongs,
  postsong,
  putsong,
} from './controllers/api/song.js';

const app = express();
app.use(express.static('public'));

/**
 * Adding Swagger documentation
 */

app.use(
  '/api-docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDefinition)
);

/**
 * Body Parser import
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Import the cookie parser
 */

app.use(cookieParser());

/**
 * Handlebars init
 */
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * App Routing
 */
app.get('/', jwtAuth, home);
app.get('/login', login);
app.get('/register', register);
app.post('/logout', logout);
app.post('/', jwtAuth, home);

/**
 * API routing
 */
app.post('/api/login', ...validationAuthentication, postLogin, login);
app.post('/api/register', ...validationAuthentication, postRegister, register);
app.get('/api/users', jwtAuth, getUsers, home);
app.get('/api/user/:id', jwtAuth, getUser, home);
app.delete('/api/user/:id', jwtAuth, deleteUser, home);
// post artist needs validation
app.post('/api/artist', jwtAuth, postArtist, home);
app.get('/api/artists', jwtAuth, getArtists, home);
app.put('/api/artist/:id', jwtAuth, putArtist, home);
app.delete('/api/artist/:id', jwtAuth, deleteArtist, home);
// post song needs validation
app.post('/api/song', jwtAuth, postsong, home);
app.get('/api/songs', jwtAuth, getsongs, home);
app.put('/api/song/:id', jwtAuth, putsong, home);
app.delete('/api/song/:id', jwtAuth, deletesong, home);

/**
 * Create database connection and start listening
 */
createConnection({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(
      `To Do Application is runninig on http://localhost:${process.env.PORT}/.`
    );
  });
});
