import { connect } from 'mongoose';
import { db } from '..';

const initializeDb = async function () {
    await connect('mongodb://mongodb:27017/rptablecom');
    console.log('initializeDb :: Connected');
    await db.user.model.createCollection();
    console.log('initializeDb :: Created "user" collection');
    process.exit(0);
};

initializeDb();
