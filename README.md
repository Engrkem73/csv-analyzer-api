📘 README.md

Below is a polished README written exactly as a recruiter or engineer expects.

📄 CV Analyzer API

A lightweight Node.js API that accepts a PDF CV, extracts text, sends it to Gemini, and returns structured JSON containing:

Short summary

Extracted skills array

Estimated years of experience

This project is designed for a technical assessment with a 1–2 hour implementation window.

🚀 Features

Accepts PDF uploads via multipart/form-data

Extracts text using PDF.js

Sends content to Gemini 2.5 Flash

Automatically extracts/cleans JSON from LLM responses

Returns structured CV insights

📦 Tech Stack

Node.js + Express

Multer (file upload)

pdfjs-dist (PDF text extraction)

Google Gemini API

dotenv for configuration

📁 Project Structure
src/
  index.js
.env
package.json
README.md

🔧 Installation
git clone https://github.com/Engrkem73/csv-analyzer-api.git
cd csv-analyzer-api
npm install

🔐 Environment Variables

Create a .env file:

GEMINI_API_KEY=your_api_key_here


Get your API key from:
https://aistudio.google.com

▶️ Run the Server
node src/index.js


The API will run on:

http://localhost:3000

📤 API Usage
POST /analyze

Uploads a PDF and returns structured CV data.

Headers
Content-Type: multipart/form-data

Body (form-data)
Key	Type	Description
file	File	Upload a PDF file
🧪 Post man Example
https://engrkem73-6053956.postman.co/workspace/Engrkem's-Workspace~b6d1445f-e1cd-4c8c-8e46-a6f6ff659cee/request/50543842-7fd5bd90-9e55-434c-96af-2ad478c20c23?action=share&source=copy-link&creator=50543842&ctx=documentation
Click Body
Click form-data
Make sure the key is file and value has test.pdf then click send

📥 Sample Response
{
  "summary": "Experienced full-stack developer specializing in Node.js and cloud services.",
  "skills": ["JavaScript", "Node.js", "React", "Express", "MongoDB"],
  "experience_years": 4
}

🏗️ Architecture

The API uses Express to handle a single POST endpoint that accepts a PDF file via multipart form data. The file is processed with PDF.js to extract text, which is then sent to Gemini for structured interpretation. The response is parsed and returned as clean, strict JSON.

📄 License

MIT
