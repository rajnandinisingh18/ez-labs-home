# EZ Labs - Home (Assignment)

Simple React + Vite single page implementing the home and contact form.

## Run locally
1. npm install
2. npm run dev
3. open http://localhost:5173

## Build
npm run build

## API
Contact form POSTs to:
https://vernanbackend.ezlab.in/api/contact-us/

Request body:
{
  "name":"Test user",
  "email":"test@gmail.com",
  "phone":"1234567890",
  "message":"Hello"
}

On success, UI shows "Form Submitted".

## Notes
- Front-end validation for empty fields and email format.
- CORS: If you get CORS errors while testing locally, use the deployed preview or Postman.
