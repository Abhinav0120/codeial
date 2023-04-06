

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
    name: 'production'
}


module.exports = development;