import mongoose from 'mongoose';

const connectionURL = process.env.MONGODB_URL || 'mongodb+srv://dbShopAdmin:16MSEns@europecluster-lgwun.mongodb.net/shop?retryWrites=true&w=majority';

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=> {
    console.log('Mongoose connected to ' + connectionURL);
})

mongoose.connection.on('error', (error)=> {
    console.log('Mongoose connection error: ' + error);
})

mongoose.connection.on('disconnected', ()=> {
    console.log('Mongoose disconected');
})

export default mongoose;
