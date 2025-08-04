# Notification System for Carbon Footprint Tracker
This microservice will notify users via email to input their daily activities for calculating CO2 emissions. 

## API Communication Contract
This microservice exposes a single endpoint for sending reminder notifications to users who have not logged their daily activities.

Endpoint: `POST /api/send-reminder`

## REQUEST Data 
To request data, you need to send a `POST` request to the `api/send-reminder` endpoint to trigger reminders to a list of users. The request will include a list of user email addresses that need a reminder. The microservice will use a predefined boilerplate message and send that message to
each email address provided.

### Example Call
POST https://localhost:3000/api/send-reminder  
{  
"userEmails": [  
"user1@example.com",  
"user2@example.com"  
]  

## RECEIVE Data 
After receiving a POST request to send a notification, the microservice processes the request and responds with a JSON response along with an HTTP status code. The response will specify whether the notifications were sent successfully, partially failed, or failed due to a bad request.

### Example Call

IF request is valid AND all emails succeed THEN  
RETURN HTTP 200 OK  
{  
"status": "Notifications sent successfully"  
}  
ELSE IF request is valid BUT some emails fail to send THEN  
RETURN HTTP 207 Multi-Status  
{  
"status": "Some notifications failed",  
"failedEmails": ["user2@example.com"]  
}  
ELSE IF request is invalid (e.g., userEmails is missing or not an array)  
THEN  
{  
RETURN HTTP 400 Bad Request  
"error": "Missing or invalid userEmails"  
}  

## UML Data 
<img width="522" height="608" alt="diagram" src="https://github.com/user-attachments/assets/11a34acc-be14-4b6b-906e-7d2376549b46" />
