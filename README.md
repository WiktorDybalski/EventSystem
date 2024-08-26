## TicketTrail

### Description

TicketTrail is an event management system that provides features for booking, and managing event tickets. This project uses Spring Boot for the backend and Angular for the frontend. Key functionalities include:

 - Event Booking: Browse and book tickets for various events.
 - JWT Authentication: Secure user sessions with JSON Web Tokens.
 - Google OAuth2: Log in using Google accounts.
 - SMS Notifications: Receive SMS updates about events via Twilio.
 - Google Maps Integration: Access event locations with Google
 Maps.
 - Real-Time Chat: Communicate with the site administrator using WebSockets.

### Project Screenshots

1. Home Page
![Screenshot 1](images/1.png)

2. Login Page
![Screenshot 2](images/2.png)

3. My Tickets Page
![Screenshot 3](images/3.png)

4. Empty Admin Chat
![Screenshot 4](images/4.png)

5. User1 interaction
![Screenshot 5](images/5.png)

6. User2 interaction
![Screenshot 6](images/6.png)

7. Admin Chat
![Screenshot 7](images/7.png)

### Usage

##### Database:
```bash
   - docker-compose up -d
```

##### Backend:
```bash
    - cd server
    - mvn spring-boot:run
```

##### Frontend:
```bash
    - cd client
    - ng serve
```

### Author
 - Wiktor Dybalski
