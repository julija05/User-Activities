import axios from 'axios';

export const sendEmail = async (email, data) => {
  try {
        const response = await axios.post('/send-email', { email, data });
        if (response.data.success) {
            alert('Email sent successfully');
        } else {
            alert('Email sending failed: ' + response.data.message);
        }
    } catch (error) {
        alert('Email sending failed: ' + error.message);
    }
};