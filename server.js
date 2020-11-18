const express = require(`express`);
const pug = require(`pug`);
let books = require(`./public/js/books.json`);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const path = require(`path`);
const { forEach } = require("./public/js/Members");
const { type } = require("os");
const methodOverride = require('method-override');

// const logger = require(`./middleware/logger`);
// const router = require('./routes/api/members');

const app = express();
const PORT = process.env.PORT || 3000;
const xhr = new XMLHttpRequest();

app.engine('pug', pug.__express);
app.set(`views`, path.join(__dirname + '/public/html'));
app.set(`view engine`, `pug`);

app.use(methodOverride('_method')); 

app.get(`/`, (req,res) => res.render(`index`,
        {   
            books: books
        }
)); 


//body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended: true }));

//members api routes
app.use('/api/books', require(path.join(__dirname, './routes/api/books')));
//set static folder
app.use(express.static(path.join(__dirname, '/public/')));

app.listen(PORT, () => console.log(`yahwoo @ ${PORT}`)); 