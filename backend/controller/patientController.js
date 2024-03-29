const Patient = require('../models/patientModel')
const mongoose = require('mongoose')

// get all patient records in the database
const getAllRecords = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 })
    res.status(200).json({
      "success": true,
      "exams": patients
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get a single patient record
const getPatientRecord = async (req, res) => {
  // destructuring: req.params.PATIENT_ID
  const { patientId } = req.params
  // console.log(req.params)

  // These are all the fields that will be returned in the query.
  // The fields are separated by spaces. 
  const fieldsToSelect = 'patientId age sex zip latestBmi latestWeight \
  pngFileName examId icuAdmit numIcuAdmissions mortality brixiaScore'

  const patientRecord = await Patient.find({patientId: patientId})

  // if patient id does not exist a 404 error will be produced
  if (patientRecord == null) {
    return res.status(404).json({ error: "Invalid patient ID" })
  }

  res.status(200).json({
    "success": true,
    "exams": patientRecord
  })
}

// get a single patient record
const getPatientRecordById = async (req, res) => {
  // destructuring: req.params.PATIENT_ID
  const { _id } = req.params
  // console.log(req.params)

  // These are all the fields that will be returned in the query.
  // The fields are separated by spaces. 
  const fieldsToSelect = 'patientId age sex zip latestBmi latestWeight \
  pngFileName examId icuAdmit numIcuAdmissions mortality brixiaScore'

  const patientRecord = await Patient.findById({_id: _id})

  // if patient id does not exist a 404 error will be produced
  if (patientRecord == null) {
    return res.status(404).json({ error: "Invalid patient ID" })
  }

  res.status(200).json({
    "success": true,
    "exams": patientRecord
  })
}

// create a new patient record
// add new patient record to the database
const createPatientRecord = async (req, res) => {
  const { name, id } = req.body
  console.log({ name, id, body: req.body, bodytype: typeof req.body })

  try {
    const patientRecord = await Patient.create(req.body)
    console.log(patientRecord)
    res.status(200).json(patientRecord)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a patient record
const deletePatientRecord = async (req, res) => {
  // this gets the `req` parameter above
  const { id } = req.params

  // check if the input ID value is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid patient ID' })
  }

  const patientRecord = await Patient.findOneAndDelete({ _id: id })

  // if patient id does not exist a 404 error will be produced
  if (!patientRecord) {
    return res.status(400).json({ error: "Invalid patient ID" })
  }

  res.status(200).json(patientRecord)
}

// update a patient record
const updatePatientRecord = async (req, res) => {

    // this gets the `req` parameter above
    const { id } = req.params

  // check if the input ID value is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid patient ID' })
  }

  const patientRecord = await Patient.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!patientRecord) {
    return res.status(400).json({ error: "Invalid patient ID" })
  }

  res.status(200).json(patientRecord)
}

// export functions so that they may be used with the routes
module.exports = {
  getAllRecords,
  getPatientRecord,
  getPatientRecordById,
  createPatientRecord,
  deletePatientRecord,
  updatePatientRecord
}