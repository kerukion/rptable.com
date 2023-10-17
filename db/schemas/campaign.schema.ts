import * as mongoose from 'mongoose'
import * as user from './user.schema';

interface _Schema {
    name: string;
    description: string;
    imageUrl: string;
    user_createdby: user.Schema['_id'];
}

export interface Schema extends _Schema {
    _id?: string;
}

export interface Document extends _Schema, mongoose.Document { }

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 500
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxlength: 500
    },
    user_createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export const model = mongoose.model<Document>('Campaign', campaignSchema);