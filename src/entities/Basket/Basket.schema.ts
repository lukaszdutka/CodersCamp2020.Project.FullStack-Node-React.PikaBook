import * as mongoose from 'mongoose';
import IBasket from './Basket.interface';

const basketSchema = new mongoose.Schema({
    createdByUserId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetUserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booksOffered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }],
    booksRequested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'accepted','rejected','cancelled','offered','failedByRequestor','failedByTarget'],
        default: 'offered'
    },
    timeCreated: {
        type: Date,
        default: Date.now
    }
});

const Basket = mongoose.model<IBasket & mongoose.Document>('Basket', basketSchema);


export default Basket;
