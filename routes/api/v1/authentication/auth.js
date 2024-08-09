var express = require('express');
var router = express.Router();
const auth = require('../../../../controllers/auth.controller');
const passport = require('../../../../libs/passport');
const { oauth2 } = require('../../../../controllers/auth.controller');
const AUTH_MIDDLEWARE = require('../../../../middlewares/restrict');


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login', session: false }),
  oauth2
);

router.post('/login', auth.authenticate);
router.post('/logout', auth.clearJWT);
router.get('/whoami', AUTH_MIDDLEWARE, auth.whoami);

module.exports = router;
