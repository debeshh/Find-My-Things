const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');
const userRoutes = require('./routers/userroutes');
const lostProductRoutes = require('./routers/lostproductroutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Allow all origins
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/lost', lostProductRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('API is running');
  });