# Test login script for Windows PowerShell
$body = @{
    email = "youssefemilio127@gmail.com"
    password = "john3:16"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri http://127.0.0.1:8000/api/v1/auth/dev/login `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body `
    -ErrorAction SilentlyContinue

if ($response) {
    Write-Host "Success! Status: $($response.StatusCode)"
    $response.Content | ConvertFrom-Json
} else {
    Write-Host "Error:"
    $Error[0].Exception.Response
}


