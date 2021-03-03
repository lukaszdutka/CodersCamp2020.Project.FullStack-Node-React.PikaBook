import * as mongoose from 'mongoose';
import Basket from './Basket.interface';

const basketSchema = new mongoose.Schema({
    createdByUserId: { 
        type: mongoose.Types.ObjectId, 
        required: true
    },
    targetUserID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    booksOffered: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    booksRequested: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','rejected','cancelled','offered','failedByRequestor','failedByTarget'],
        required: true
    }
});

const basketModel = mongoose.model<Basket & mongoose.Document>('Basket', basketSchema);

export default basketModel;