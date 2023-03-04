const mongoose = require('mongoose')

// create a new schema
const Schema = mongoose.Schema 

// fix the database record names. Some of them have spaces and
// others have underscores. This should be uniform.
// change the database keys to the current schema
const patientRecord = new Schema({
  // the schema describes what the data should look like, e.g. if it should be a number or string, etc.
  // the schema defines the structure of a piece of data or document
  PATIENT_ID: {
    type: String,
    required: true
  },
  // age: {
  //   type: Number,
  //   required: true
  // },
  // sex: {
  //   type: String,
  //   required: true
  // },
  // zip: {
  //   type: Number,
  //   required: true
  // },
  // latest_bmi: {
  //   type: Number,
  //   required: true
  // },
  // latest_weight: {
  //   type: Number,
  //   required: true
  // },
  // png_filename: {
  //   type: Number,
  //   required: true
  // },
  // exam_id: {
  //   type: String,
  //   required: true
  // },
  // lastest_bmi: {
  //   type: Number,
  //   required: true
  // },
  // icu_admission: {
  //   type: String
  // },
  // num_icu_admissions: {
  //   type: Number
  // },
  // mortality: {
  //   type: String
  // }

}, { timestamps: true }) // creates a time stamp for when the request was made.


// models apply the schemas that have been created
// we can then use models to interact with a [TBD]
module.exports = mongoose.model('patient', patientRecord)

