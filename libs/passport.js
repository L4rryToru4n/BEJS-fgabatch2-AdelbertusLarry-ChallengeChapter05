const { PrismaClient, Prisma } = require('@prisma/client');
const client = new PrismaClient();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { GA_CLIENT_ID, GA_CLIENT_SECRET, GA_CALLBACK_URL } = process.env;

passport.use(new GoogleStrategy({
  clientID: GA_CLIENT_ID,
  clientSecret: GA_CLIENT_SECRET,
  callbackURL: GA_CALLBACK_URL
}, async function (accessToken, refreshToken, profile, done) {
  try {
    let user = await client.users.upsert({
      where: { email: profile.emails[0].value },
      update: { googleId: profile.id },
      create: {

        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
      }
    });

    done(null, user);
  }
  catch (error) {
    done(error, null);
  }
}));

module.exports = passport;