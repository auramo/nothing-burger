const passport = require('passport')
const R = require('ramda')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const cookieParser = require('cookie-parser')
const userRepository = require('../user/userRepository')
const {okResponse} = require('../requestHelpers')


const verifyCallback = async (req, accessToken, refreshToken, profile, done) => {

  const userFetchCallback = user =>
    user ? done(null, user) : done(null, false, {message: 'User not authorized'})

  try {
    const email = profile.emails[0].value.toLowerCase()
    const user = await userRepository.findUserByLogin(email)
    userFetchCallback(user)
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    done(null, false, {message: 'Error occurred: ' + e})
  }
}

const authenticationFailed = (req, res) => {
  req.logout()
  res.redirect('/login?failed=true')
}

const authenticationSuccessful = (req, user, next, res) => {
  const redirectTo = R.isEmpty(req.session.desiredUrlAfterLogin) ? '/' : req.session.desiredUrlAfterLogin
  req.logIn(user, err => {
    if (err) {
      next(err)
    } else {
      req.session.save(() =>  res.redirect(redirectTo))
    }
  })
}

module.exports.init = app => {

  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true
    },
    verifyCallback
  ))

  passport.serializeUser(function(user, done) {
    done(null, user);
  })

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  app.get('/auth/googlelogin*', (req, res) => {
    req.session.desiredUrlAfterLogin = req.url.substr('/auth/googlelogin'.length)
      return passport.authenticate('google',
        {scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email'], state: null}
      )(req, res)
  })

  app.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user) => {
      if (err) {
        next(err)
      } else if (!user) {
        authenticationFailed(req, res)
      } else {
        authenticationSuccessful(req, user, next, res)
      }
    })(req, res, next)
  })

  app.post('/auth/logout', (req, res) => {
    req.logout()
    okResponse(res)
  })

}
