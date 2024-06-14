#!/bin/bash

# Cambia al directorio del backend y ejecuta el servidor
echo "Iniciando el backend..."
cd "C:\Users\eduba\Desktop\Otros\Projects\comp.io\backend"
mintty -h always -e node index.js "$@" &
#cd backend
#node index.js

# Cambia al directorio del frontend y ejecuta la aplicación
echo "Iniciando el frontend..."
cd "C:\Users\eduba\Desktop\Otros\Projects\comp.io\frontend"
mintty -h always -e npm start "$@" &
#cd ../frontend
#npm start