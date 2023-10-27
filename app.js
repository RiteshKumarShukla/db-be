process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const app = express();
const cors = require('cors');
const certificationRoutes = require('./routes/certificationRoutes');
const contactRoutes = require('./routes/contactRoutes');

const documentRoutes = require('./routes/documentRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const adminAuth = require('./routes/adminAuth');
const otpRoutes = require('./routes/otpRoutes');

require('./db');

app.use(cors());
app.use(express.json());

app.use('/certifications', certificationRoutes);
app.use('/contacts', contactRoutes);
app.use('/', certificateRoutes);
app.use('/', documentRoutes);
app.use('/api/documents/uploads', express.static('uploads'));
app.use('/', registrationRoutes);
app.use('/api', otpRoutes);
app.use('/adminlogin', adminAuth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
