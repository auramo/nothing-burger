
module.exports.errorResponse = (res, err) => {
  console.error(err)
    res.status(500).json({error: 'Server error', err})
}

// Sends an empty JSON message with status 200
module.exports.okResponse = res => {
  res.json({})
}
