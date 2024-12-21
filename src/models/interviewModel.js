import mongoose from 'mongoose';


const interviewSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    jobTitle: String,
    framework: String,
    open: Boolean,
    close: Boolean,
    yearsOfExperience: String,
    questions: [
        {
            question: String,
            answer: String,
            userAnswer: String,
            feedback: { type: Number, default: 0 }
        }
    ]
});

const Interview  = mongoose.models.interviews || mongoose.model('interviews', interviewSchema);

export default Interview;
