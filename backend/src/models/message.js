import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({}, { strict: false });

const Message = mongoose.model('Message', messageSchema);

export default Message