import mongoose from "mongoose"

const tutorSchema = new mongoose.Schema({}, { strict: false });

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor


