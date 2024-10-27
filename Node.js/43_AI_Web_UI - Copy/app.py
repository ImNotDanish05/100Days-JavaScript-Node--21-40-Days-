from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/ollama', methods=['POST'])
def ollama():
    user_input = request.json.get('input')
    command = ['ollama', 'run', 'llama3.2', '-p', user_input]
    result = subprocess.run(command, capture_output=True, text=True)
    return jsonify({'response': result.stdout})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
