module.exports.init = app => {
  app.get('/api/user', (req, res) => {
    res.json({user: req.user})
  })
}
