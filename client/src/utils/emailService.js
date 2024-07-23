import axios from 'axios';
import { toast } from 'react-toastify';

const sendEmail = async (to, subject , html) => {
  try {
    const response = await axios.post('http://localhost:3003/mail/send', {
      to,
      subject,
      html
    });
    toast.success(response.data);
  } catch (error) {
    console.error('Error sending email:', error);
    toast.error('Failed to send email.');
  }
};

export default sendEmail;
