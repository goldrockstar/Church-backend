const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const Emailrouter = require('./router/Emailrouter');
const frontrouter = require('./router/frontrouter/Landingroute');
const AnbiyamRoute = require('./router/frontrouter/AnbiyamRoute');
const ServicesRoute = require('./router/frontrouter/ServicesRoute');
const PiousRoute = require('./router/frontrouter/PiousRoute');
const GalleryRoute = require('./router/frontrouter/GalleryRoute');
const adminrouter = require('./router/frontrouter/adminRoutes');


const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', Emailrouter);
app.use('/land', frontrouter);
app.use('/anbiyam', AnbiyamRoute);
app.use('/serv', ServicesRoute);
app.use('/pious', PiousRoute);
app.use('/gallery', GalleryRoute);
app.use('/church', adminrouter);

// Database connection
mongoose.connect('mongodb+srv://Lawrance:Jesus143@cluster0.ux5cvqo.mongodb.net/?appName=Cluster0').then(() => {
   console.log('Connected to MongoDB');
}).catch((error) => {
   console.error('Database connection error:', error);
});

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});