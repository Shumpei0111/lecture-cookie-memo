const protect = require("static-auth");
const safeCompare = require("safe-compare");

const app = protect(
    '/',
    ( username, password ) => safeCompare( username, 'cooptech' ) && safeCompare( password, 'frontend' ),
    {
        directory: __dirname,
        realm: 'vercel-basic-auth.node-static-auth',
        onAuthFailed: res => {
            res.end('Restricted area, please login (cooptec:frontend).');
        }
    }
);

module.exports = app;