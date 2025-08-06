const http = require('http');

const data = JSON.stringify({
  userEmails: ['user1@example.com', 'user2@example.com']
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/send-reminder',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let responseData = '';

  res.on('data', chunk => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', JSON.parse(responseData));
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.write(data);
req.end();
