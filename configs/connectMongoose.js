const mongoose = require('mongoose')

const connectMongoose = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log(process.env.DB_HOST)
    await mongoose.connect(process.env.DB_HOST)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
  }
}

module.exports = connectMongoose
