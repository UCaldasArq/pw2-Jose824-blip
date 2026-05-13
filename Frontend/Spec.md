# Frontend Spec — Web 2 Final Exam

## Project Name

Screen Time Tracker

---

# Objective

Develop a React application that allows users to manually register the time they spend using different applications throughout the day.

The system must display visual statistics and comparisons between applications through charts and summaries.

The project will consume a backend API already provided in the repository.

---

# General Description

The application will allow:

- Registering users
- Registering application usage records
- Visualizing usage statistics
- Comparing time spent between applications
- Viewing usage distribution during the day

The frontend must be developed using:

- React
- React Router
- Axios
- CSS Modules / Tailwind / plain CSS (student choice)
- Chart library (Recharts recommended)

---

# Main Functionalities

## 1. User Registration

The system must allow creating users with the following fields:

| Field | Type | Required |
|---|---|---|
| firstName | text | yes |
| lastName | text | yes |
| document | text | yes |
| phoneNumber | text | yes |

---

# Validation Rules

- All fields are mandatory
- Document number must be unique
- Phone number must contain only numbers
- Empty forms must not be submitted

---

# Required Screen

## `/users`

This screen must contain:

- User registration form
- List of registered users
- Button to delete users
- Loading state
- Error handling

---

# 2. Application Usage Registration

Users can manually register the time spent on an application.

---

# Usage Record Structure

| Field | Type |
|---|---|
| user | select |
| application | select |
| days | number |
| hours | number |
| minutes | number |
| usagePeriod | select |

---

# Available Applications

The application list must be loaded from the backend API.

Example applications:

- YouTube
- TikTok
- Instagram
- WhatsApp
- Facebook
- X
- Netflix
- Spotify

---

# Usage Period Options

| Value |
|---|
| Morning |
| Afternoon |
| Night |

---

# Validation Rules

- User selection is mandatory
- Application selection is mandatory
- Negative values are not allowed
- Hours must be between 0 and 23
- Minutes must be between 0 and 59

---

# Required Screen

## `/usage`

This screen must contain:

- Usage registration form
- Usage history table
- Filters by application
- Filters by user
- Delete functionality

---

# 3. Dashboard

The dashboard must visualize application usage statistics.

---

# Required Charts

## A. Application Comparison Chart

A chart that compares total usage time between applications.

Recommended:

- Bar chart
- Pie chart

---

## B. Usage Distribution by Time of Day

A chart that shows:

- Which applications are used most frequently
- During which period of the day

Recommended:

- Stacked bar chart
- Area chart

---

## C. Top Used Application

Display:

- Most used application
- Total accumulated time

---

# Required Screen

## `/dashboard`

The dashboard must include:

- At least 2 charts
- Summary cards
- Responsive layout
- Loading state

---

# Required Components

Students must complete or fix the following components:

| Component |
|---|
| UserForm |
| UserTable |
| UsageForm |
| UsageTable |
| Dashboard |
| ApplicationChart |
| UsagePeriodChart |
| Navbar |

Some components in the repository may be intentionally incomplete.

---

# Routing

The application must contain the following routes:

| Route | Description |
|---|---|
| `/` | Home |
| `/users` | User management |
| `/usage` | Usage records |
| `/dashboard` | Statistics dashboard |

---

# API Integration

Students must complete the integration with the backend API using Axios.

The repository already contains:

- Axios configuration
- Base API URL
- Some incomplete service methods

---

# Expected API Endpoints

## Users

```http
GET /users
POST /users
DELETE /users/{id}