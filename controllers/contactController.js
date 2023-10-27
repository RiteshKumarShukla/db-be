const Contact = require('../models/Contact'); // Import the Contact model
const nodemailer = require('nodemailer'); // Import Nodemailer

// Handle the submission of the contact form
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create a new contact record in the database
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    // Save the contact record to the database
    await contact.save();

    // Send a "Thank you" email to the user
    sendThankYouEmail(email);

    res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'An error occurred while submitting the contact form' });
  }
};

const sendThankYouEmail = async (toEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // E.g., Gmail, Yahoo, etc.
      auth: {
        user: 'ritesh.digiblocks@gmail.com', // Your email address
        pass: 'bejhhyhsojeecvra', // Your email password --> bejhhyhsojeecvra
      },
    });

    const mailOptions = {
      from: 'ritesh.digiblocks@gmail.com', // Your email address
      to: toEmail, // User's email address
      subject: 'Thank you for contacting us',
      html: `
          <html>
            <head>
              <style>
                /* Add your custom email styles here */
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .logo {
                  text-align: center;
                }
                .logo img {                
                  display: block;
                  margin: 0 auto;
                }
                .message {
                  margin-top: 20px;
                  text-align: center;
                  color: #333;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo">
                  <img src="https://curious-bubblegum-f47d3e.netlify.app/Digiblocks%20(2).png" alt="Digiblocks Logo">
                </div>
                <div class="message">
                  <h1>Thank you for contacting us</h1>
                  <p>We have received your message and will get back to you as soon as possible.</p>
                  <p>Regards,</p>
                  <p>Digiblocks</p>
                </div>
              </div>
            </body>
          </html>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully');
  } catch (error) {
    console.error('Error sending thank you email:', error);
  }
};




const sendUserMessage = async (toEmail, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ritesh.digiblocks@gmail.com', // Your email address
        pass: 'bejhhyhsojeecvra', // Your email password --> bejhhyhsojeecvra
      },
    });

    const mailOptions = {
      from: 'ritesh.digiblocks@gmail.com', // Your email address
      to: toEmail,
      subject: 'Reply from Digiblocks',
      html: `
        <html>
          <head>
            <style>
              /* Add your custom email styles here */
              body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                color: #ffffff;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                padding: 20px;
              }
              .logo img {                
                display: block;
                margin: 0 auto;
              }
              .message {
                margin-top: 20px;
                text-align: center;
                color: #333;
              }
              .footer {
                text-align: center;
                padding: 20px;
                background-color: #ef6042;
                color: #ffffff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://curious-bubblegum-f47d3e.netlify.app/Digiblocks%20(2).png" alt="Digiblocks Logo">
              </div>
              <div class="message">
                <h1>Reply from Digiblocks</h1>
                <p>We are replying to your message:</p>
                <p>${message}</p>
                <p>Thank you for contacting Digiblocks!</p>
              </div>
              <div class="footer">
                <p>For any further inquiries, please contact us at +91-9945015551 or email us at admin@digiblocks.tech</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Reply email sent successfully');
  } catch (error) {
    console.error('Error sending reply email:', error);
  }
};


const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'An error occurred while fetching contacts' });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the contact' });
  }
};


const updateContact = async (req, res) => {
  try {
    const { name, email, phone, message, status } = req.body; // Include the status field in the request body
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, message, status }, // Include the status field in the update
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'An error occurred while updating the contact' });
  }
};


const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'An error occurred while deleting the contact' });
  }
};

const sendMessageToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    sendUserMessage(contact.email, message);

    res.status(200).json({ message: 'Message sent to user successfully' });
  } catch (error) {
    console.error('Error sending message to user:', error);
    res.status(500).json({ error: 'An error occurred while sending the message to the user' });
  }
};


const toggleContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    // Toggle the status of the contact (e.g., from true to false or vice versa)
    contact.status = !contact.status;
    await contact.save();

    res.status(200).json({ message: 'Contact status changed successfully', status: contact.status });
  } catch (error) {
    console.error('Error changing contact status:', error);
    res.status(500).json({ error: 'An error occurred while changing the contact status' });
  }
};




module.exports = {
  submitContactForm,
  getAllContacts,
  updateContact,
  deleteContact,
  getContactById,
  sendMessageToUser,
  toggleContactStatus, 
};
