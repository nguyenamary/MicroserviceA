const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const boilerplateMessage = "Friendly reminder to log your CO2 activities for today!";

function sendEmail(email, message) {
  if (email.includes("fail")) {
    return false;
  }
  console.log(`Email sent to ${email}: ${message}`);
  return true;
}

app.post('/api/send-reminder', (req, res) => {
  const { userEmails } = req.body;

  // Validate request
  if (!Array.isArray(userEmails) || userEmails.length === 0) {
    return res.status(400).json({ error: "Missing or invalid userEmails" });
  }

  const failedEmails = [];

  userEmails.forEach(email => {
    const success = sendEmail(email, boilerplateMessage);
    if (!success) {
      failedEmails.push(email);
    }
  });

  if (failedEmails.length === 0) {
    return res.status(200).json({ status: "Notifications sent successfully" });
  } else {
    return res.status(207).json({
      status: failedEmails.length === userEmails.length
        ? "All notifications failed"
        : "Some notifications failed",
      failedEmails: failedEmails
    });
  }
});

app.listen(PORT, () => {
  console.log(`Notification microservice running at http://localhost:${PORT}`);
});
