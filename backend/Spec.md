# Backend Spec — Web 2 Final Exam

## Project Name

Screen Time Tracker API

---

# Objective

Develop a REST API using Spring Boot that allows managing users and tracking the time spent using different applications.

The API must expose endpoints for user management, application usage registration, and statistical dashboard information.

The backend will be consumed by a React frontend already included in the repository.

---

# General Description

The backend must provide:

- User management
- Application management
- Usage tracking
- Statistical calculations
- REST API endpoints
- Validation handling
- Create unit test for the application
- Dockerized execution
- MySQL database integration

The repository already contains partially implemented code.

Students are expected to complete missing logic, fix bugs, and ensure the application works correctly.

---

# Technologies

| Technology | Version |
|---|---|
| Java | 17 |
| Spring Boot | 4.0.6 |
| Maven | Latest |
| MySQL | 8 |
| Docker | Latest |
| JUnit | 5 |
| Mockito | Latest |

---

# Project Architecture

Students must work with the following layers:

```txt
controller/
service/
repository/
entity/
dto/
mapper/
config/
exception/