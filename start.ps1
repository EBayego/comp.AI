# Inicia el backend
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList '-NoExit', '-Command', 'cd "C:\Users\Edu\Desktop\Projects\comp.AI\backend"; node index.js'

# Inicia el chatbot
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList '-NoExit', '-Command', 'cd "C:\Users\Edu\Desktop\Projects\comp.AI\backend"; uvicorn server.server:app --host 0.0.0.0 --port 8000 --reload'

# Inicia el frontend
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList '-NoExit', '-Command', 'cd "C:\Users\Edu\Desktop\Projects\comp.AI\frontend"; npm start'