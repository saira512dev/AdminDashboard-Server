export default function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
        console.log("🚀 ~ file: auth.js:8 ~req.user:",req.session)
      }
    }
  