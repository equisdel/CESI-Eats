# Liste des services à initialiser
$services = @(
    "auth-service",
    "gateway",
    "services/user-service",
    "services/order-service",
    "services/menu-service",
    "services/payment-service",
    "services/delivery-service",
    "services/analytics-service",
    "services/component-service"
)

# Contenu du Dockerfile
$dockerfile = @"
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE `$(PORT)
CMD ["node", "server.js"]
"@

# Contenu du server.js
$serverjs = @"
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send(\`Port \${process.env.PORT} - \${process.env.SERVICE_NAME || 'Service'} is running\`);
});

app.listen(port, () => {
  console.log(\`\${process.env.SERVICE_NAME || 'Service'} listening on port \${port}\`);
});
"@

foreach ($service in $services) {
    $path = Join-Path -Path $PWD -ChildPath $service
    Write-Host "📁 Initialisation de $service"

    # Créer le dossier s'il n'existe pas
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }

    # Créer le Dockerfile
    $dockerfilePath = Join-Path $path "Dockerfile"
    $dockerfile | Out-File -Encoding utf8 $dockerfilePath -Force

    # Créer le package.json (npm init -y)
    Push-Location $path
    if (-not (Test-Path "package.json")) {
        npm init -y | Out-Null
    }
    Pop-Location

    # Créer le server.js
    $serverjsPath = Join-Path $path "server.js"
    $serverjs | Out-File -Encoding utf8 $serverjsPath -Force

    Write-Host "✔️ Fichiers générés pour $service"
}
