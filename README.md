# Overview

This project aims to design an API for a hospital allocated by the government for testing, quarantine, and well-being of COVID-19 patients. The API supports two types of users: Doctors and Patients. Doctors can log in, register patients, and create reports based on checkups.

# Deployment
https://hostipal-api.onrender.com/

## User Types
1. Doctors
    - Log in (POST /doctors/login)
    - Register (POST /doctors/register)
2. Patients
    - Register (POST /patients/register)
    - Create Report (POST /patients/:id/create_report)
    - List All Reports (GET /patients/:id/all_reports)

  
## API Routes
  
  ### Doctor Routes
    1. Register: POST /doctors/register
    2. Login: POST /doctors/login (Returns JWT for authentication)
    
  ### Patient Routes
    1. Register: POST /patients/register
    2. Create Report: POST /patients/:id/create_report
    3. List All Reports: GET /patients/:id/all_reports
  
  ### Report Routes
  1. List Reports by Status: GET /reports/:status (List all reports of all patients filtered by a specific status)

## Authentication
  Authentication is required for the following routes:
1. /doctors/login
2. /patients/:id/create_report
3. /patients/:id/all_reports

## Schemas
  ### Doctor Schema
    1. username (String)
    2. password (String)
    3. gender (String, enum - MALE, FEMALE)
    4. specilization
  
  ### Patient Schema
    1. id (Auto-generated)
    2. phone_no (String)
    3. Patient_name (String)
    4. gender (String, enum - MALE, FEMALE)
    5. reports (Array of Report Schemas)
    
  ### Report Schema
    1. createdBy (Doctor Schema)
    2. status (Enum: Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit)
    3. date (Date)
    4. patient_id (patient schema)
    
## Example Usage
  ### Register a Doctor: POST /doctors/register
```json
    {
        "username": "doctor123",
        "password": "securepassword",
        "gender": "MALE",
        "specilization": "Pulmonologists"
    }
```

  ### Doctor Login: POST /doctors/login
  ```json
    {
        "username": "doctor123",
        "password": "securepassword"
    }
```

  ### Register a Patient: POST /patients/register
```json
    {   
        "patient_name": "patient001",
        "phone_no": 1234567890,
        "gender": "MALE"
    }
```

  ### Create a Report for a Patient: POST /patients/:id/create_report
  ```json 
    {
        "status": "Symptoms-Quarantine"
    }
```

  ### List All Reports for a Patient: GET /patients/:id/all_reports

  ### List Reports by Status: GET /reports/Positive-Admit
