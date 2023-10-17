import { connect } from 'mongoose';
import { db } from '..';

const initializeDb = async function () {
    await connect('mongodb://mongodb:27017/rptablecom');
    console.log('initializeDb :: Connected');

    await db.user.model.createCollection();
    await db.user.model.collection.insertMany([{
        username: 'smzelek@gmail.com',
        name: 'Steven Zelek',
    }]);

    const user = await db.user.model.findOne({
        username: 'smzelek@gmail.com',
    });
    const userId = user!._id;
    console.log(user, userId);

    await db.campaign.model.createCollection();
    await db.campaign.model.collection.insertMany([{
        name: 'The Rival Gods',
        description: 'The world of Estrador, invaded by the magic of the Godlands, becomes the latest battlefield in the Far War of the Four Rival Gods.',
        imageUrl: 'https://static1.thegamerimages.com/wordpress/wp-content/uploads/2020/04/Tyr.jpg?q=50&fit=crop&w=1400&dpr=1.5',
        user_createdby: userId,
    }]);

    console.log('initializeDb :: Created "user" collection');
    process.exit(0);
};

initializeDb();

