from flask import Flask, request, jsonify
from model import load_model
from transformers import pipeline
from flask_cors import CORS
import chardet  
import PyPDF2



app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model, tokenizer = load_model()
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)


def extract_text_from_pdf(pdf_file):
  with open(pdf_file, 'rb') as pdf_reader:
    reader = PyPDF2.PdfReader(pdf_reader)
    num_pages = len(reader.pages)
    text = ""
    for page_num in range(num_pages):
      page = reader.pages[page_num]
      text += page.extract_text()
  return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400


    try:
        # Attempt to detect encoding using chardet
        raw_data = file.read()
        result = chardet.detect(raw_data)
        encoding = result['encoding'] if result['confidence'] > 0.9 else 'utf-8'

        # Decode the file based on detected or default encoding
        text = raw_data.decode(encoding)
        return jsonify({'text': text})
    except UnicodeDecodeError:
        return "Unsupported file encoding. Please try a different file.", 415  # Unsupported Media Type


@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return "No text provided", 400

    # Use the GPT-2 model to summarize the text
    summarized = summarizer(text, max_length=1000, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = summarized[0]['summary_text']
    
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    print("Server running...")