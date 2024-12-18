import mongoose from 'mongoose';


const interviewSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    jobDescription: String,
    experience: String,
    topic: String,
});

const Interview  = mongoose.models.interviews || mongoose.model('interviews', interviewSchema);

export default Interview;