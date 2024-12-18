import mongoose from 'mongoose';


const interviewSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    jobTitle: String,
    framework: String,
    yearsOfExperience: String,
    questions: [
        {
            question: String,
            answer: String,
            userAnswer: String
        }
    ]
});

const Interview  = mongoose.models.interviews || mongoose.model('interviews', interviewSchema);

export default Interview;
