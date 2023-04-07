

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        secure: 'false',
        auth: {
            user: 'abhinavtestacc01@gmail.com', //Add your Email Id
            pass: 'edfntphtyuhopmks' //Add your Email Id's password
        }
    },
    google_client_id: "785782352442-d6mj1da0mh5ri3sf26ogg0prtfgsle2s.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',


}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB ,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        secure: 'false',
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME, //Add your Email Id
            pass: process.env.CODEIAL_GMAIL_PASSWORD //Add your Email Id's password
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);