// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/authRoutes');

const router2 = require('./routes/usersRoutes');

const jewlleryRoutes = require("./routes/jewlleryRoutes");

const supListRoute = require('../backend/routes/supListRoute');
const suproute = require('../backend/routes/suproute');

const router3 = require('./routes/ordersRoutes');
const router4 = require('./routes/feedbackRouter');

const imageRoutes = require("./routes/imageRoutes");
const inquiryRoute = require('./routes/inquiryRoute');
const gemrouter = require('./routes/gemRoutes');

const router6 = require('./routes/materialRouter');
const useRouter7 = require('./routes/useMaterialRouter')

const newMaterialRouter = require('./routes/newMaterialRouter')
const totalWeightRouter = require('./routes/totalWeightRoutes')



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api', router);
// app.use('/api/send-verification-code', router);
app.use('/api/users', router2);

app.use('/api/user', require('./routes/users'));


app.use("/", jewlleryRoutes);
app.use("/get-images", jewlleryRoutes);
app.use("/upload-image", jewlleryRoutes);
app.use("/delete-image/:id", jewlleryRoutes);
app.use("/update-image/:id", jewlleryRoutes);
app.use("/get-item/:id", jewlleryRoutes);
app.use('/api',suproute);
app.use('/api',supListRoute);

app.use('/api/orders', router3);


app.use('/api',router4);

//gem routes
app.use("/", imageRoutes);
app.use("/gemget-images", imageRoutes);
app.use("/gemupload-image", imageRoutes);
app.use("/gemdelete-image/:id", imageRoutes);
app.use("/gemupdate-image/:id", imageRoutes);

app.use('/api', gemrouter);
app.use('/api', inquiryRoute);

app.use('/api', router6);
app.use('/api', useRouter7);

app.use('/api',newMaterialRouter);
app.use('/api',totalWeightRouter)


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
