import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import BooksRoute from '@routes/books.route';
import WritersRoute from '@routes/writers.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import {Database} from './database';
import CategoriesRoute from '@routes/categories.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new BooksRoute(), new WritersRoute(), new CategoriesRoute()]);


app.listen();
Database.initialize().then(() => {
    console.log("sudah terhubung");
}).catch((err) => {
    console.error("Eror", err)
});


