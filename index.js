const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const app = express();

require('./config/view-helpres')(app);

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(cors());

// setup the chat server and used with socket.io
// const cors = require('cors');
// const corsOptions = {
//     origin: ['http://localhost:8000', 'http://localhost:4200']
//   };
// app.use(cors(corsOptions));
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening Port 5000');
const path = require('path');



if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));    
}

// reading through the post request
app.use(express.urlencoded());
app.use(cookieParser());
// make uploads path available to hte browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(express.static(env.asset_path));
app.use(expressLayouts);
//extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine','ejs'); 
app.set('views', './views');

// mongo store is used to store the cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) 
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, 
    function(err){
        console.log(err || 'connect mongodb setup ok');
    })
}));

app.use(passport.initialize()); 
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on the port: ${port}`);
})