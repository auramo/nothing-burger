module.exports = () => {
  console.log('running migrations')
  const dbm = require('db-migrate').getInstance(true,
    {config: `${__dirname}/database.json`,
      cwd: `${__dirname}/`
    })
  dbm.up()
    .then(() => console.log("migration check completed"))
    .catch((err) =>  console.log("error running migrations", err)
  )
}
