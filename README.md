# Backend System Design Using Queue

## 📌 Project Overview
This project implements a backend system that efficiently manages requests from multiple users using a queue-based architecture. Each client has its own queue, and requests are processed sequentially in a scalable and robust manner.

## 🚀 Features
- **User Authentication**: Secure user login and authentication.
- **Request Queueing**: FIFO-based queue for handling user requests.
- **Concurrent Processing**: Worker threads for executing queued requests.
- **Database Integration**: MongoDB for storing user and request data.
- **Logging & Monitoring**: Integrated logging and error handling.
- **Scalability**: Supports multiple users and requests efficiently.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Queueing System**: Redis 
- **Database**: MongoDB 
- **Authentication**: JWT (JSON Web Tokens)
- **Monitoring**:  Grafana


## 📺 System Design

- **Client-Server Model**: Users interact with the system through a client interface that sends requests to the server.
- **Queue Management**: Each client connection has a dedicated queue. A queue manager handles the creation, management, and deletion of queues.
- **Worker Processes**: Dedicated worker processes pull requests from queues and execute them sequentially.

## ✍🏼 Assignment Tasks

### 1. System Architecture

- Draw a system architecture diagram showing the client-server model, queue system, database, and worker processes.

### 2. Implementation

- Implement user authentication.
- Setup the queue for each client.
- Create worker processes that execute tasks from the queue.

### 3. Testing

- Write unit tests to verify the system's functionality under various scenarios.

### 4. Deployment

- Prepare a deployment plan using Docker containers for each component of the system.

##⚘ Flow Diagrams

### 1. Overall System Flow

- Diagram showing the interaction between users, client interface, server, queues, and workers.

### 2. Detailed Process Flow

- A detailed diagram of how requests are received, authenticated, queued, processed, and logged.

## Submission Requirements

- Source code for all components.
- Dockerfiles for building container images.
- System and process flow diagrams.
- Test cases and results.
- Documentation explaining the system architecture and code.

## 📂 Project Structure
```
backend-queue-system/
│── src/
│   │── config/
│   │   │── config.js
│   │   │── db.js
│   │   │── redis.js
│   │── controllers/
│   │   │── authController.js
│   │   │── queueController.js
│   │── middleware/
│   │   │── authMiddleware.js
│   │── models/
│   │   │── requestModel.js
│   │   │── userModel.js
│   │── routes/
│   │   │── authRoutes.js
│   │   │── queueRoutes.js
│   │── services/
│   │   │── authService.js
│   │   │── queueService.js
│   │   │── workerService.js
│   │── worker/
│   │   │── worker.js
│   │── utils/
│   │   │── errorHandler.js
│   │   │── logger.js
│   │   │── validator.js
│   │── index.js
│   │── server.js
│── test/
│   │── auth.test.js
│   │── queue.test.js
│   │── worker.test.js
│── .env
│── .gitignore
│── package.json
│── package-lock.json
│── README.md
```

## Implementation Details

### User Authentication

- Implemented secure user authentication using JWT (JSON Web Tokens) to ensure that only authenticated users can enqueue requests.

### Request Queueing

- Utilized RabbitMQ for implementing queues for each client. Each client has a dedicated queue to handle requests in a FIFO manner.

### Request Processing

- Developed worker processes that pull requests from the queues and execute them sequentially. The workers ensure that each request is processed in the order it was received.

### Concurrency Management

- The system handles multiple clients and their queues concurrently using Node.js's asynchronous capabilities and RabbitMQ's concurrency features.

### Scalability

- The system is designed to scale horizontally by adding more worker processes and queue instances as the number of users and requests increases.

### Robustness

- Implemented error handling and recovery mechanisms to manage failures without data loss. The system ensures that all requests are processed even in the event of a failure.

### Logging and Monitoring

- Set up logging using Winston for tracking request handling and system monitoring using Prometheus and Grafana for performance metrics.

## 🪛 Testing

- Wrote unit tests using Mocha and Chai to verify the system's functionality under various scenarios. The tests cover user authentication, request queueing, request processing, and error handling.

## 🖥️ Deployment

- Prepared a deployment plan using Docker containers for each component of the system. The Dockerfiles for building container images are included in the submission.

## 📄 Documentation

- Provided detailed documentation explaining the system architecture and code. The documentation includes an overview of the system design, implementation details, and instructions for setting up and running the system.

##☞ Conclusion

This assignment aims to design and implement a robust and scalable backend system using a queue structure to manage requests from multiple users efficiently. The system ensures that all requests are processed sequentially and that the queue is empty once all requests are processed and all users disconnect. The implementation uses Node.js, RabbitMQ, PostgreSQL, Prometheus, and Grafana to achieve the objectives.

##📌 Contributing

- Fork the repository.
- Create a new feature branch (git checkout -b feature-name).
- Commit changes (git commit -m 'Add feature').
- Push to the branch (git push origin feature-name).
- Open a pull request.

## 📞 Contact
### Notes:
- Replace `Sharad Singh Kushwaha` and `Backend-System-Design-Using-Queue` with your actual GitHub username and repository name.
- Update `sharadsingh0203@gmail.com` with your email.
- Modify the API endpoints section according to your implementation.
