# ============================
# JWT Authentication Test Script
# ============================

# Initialize optional log file
$logPath = ".\auth-test.log"
"`n=== Auth Test Log (Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')) ===`n" | Out-File -FilePath $logPath -Append

# Function: Test JWT Authentication
function Test-JWTAuthentication {
    param (
        [string]$username,
        [string]$password
    )

    Write-Host "`n======================================="
    Write-Host "=== Testing User: $username ==="
    Write-Host "=======================================`n"

    # Step 1: Login to get JWT token
    Write-Host "Attempting login for user: $username..."
    try {
        $response = Invoke-RestMethod -Uri http://localhost:3000/auth/login `
          -Method POST `
          -Headers @{"Content-Type" = "application/json"} `
          -Body (@{
              username = $username
              password = $password
          } | ConvertTo-Json)

        $token = $response.access_token
        Write-Host "`n✅ Login successful!"
        Write-Host "Token: $token"

        "`n=== User: ${username} ===`nToken: $token`n" | Out-File -Append -FilePath $logPath
    } catch {
        Write-Host "`n❌ Login failed for user: ${username}"
        Write-Host $_.Exception.Message
        "`n❌ Login failed for user: ${username}`n$($_.Exception.Message)`n" | Out-File -Append -FilePath $logPath
        return
    }

    # Step 2: Access protected endpoint with valid token
    Write-Host "`nAccessing protected endpoint with valid token..."
    try {
        $responseProtected = Invoke-RestMethod -Uri http://localhost:3000/auth/profile `
          -Method GET `
          -Headers @{"Authorization" = "Bearer $token"}

        $responseJson = $responseProtected | ConvertTo-Json -Depth 3
        Write-Host "`n✅ Protected Route Response (Valid Token):"
        Write-Output $responseJson

        "`n=== Protected Route Response for ${username} (Valid Token) ===`n$responseJson`n" | Out-File -Append -FilePath $logPath
    } catch {
        Write-Host "`n❌ Failed to access protected route for user: ${username}"
        Write-Host $_.Exception.Message
        "`n❌ Failed to access protected route for user: ${username}`n$($_.Exception.Message)`n" | Out-File -Append -FilePath $logPath
    }

    # Step 3: Access protected endpoint with invalid token
    Write-Host "`nSimulating invalid token access..."
    try {
        $responseInvalid = Invoke-RestMethod -Uri http://localhost:3000/auth/profile `
          -Method GET `
          -Headers @{"Authorization" = "Bearer invalidtoken"} `
          -ErrorAction Stop

        $invalidJson = $responseInvalid | ConvertTo-Json -Depth 3
        Write-Host "`n❗️Unexpected success with invalid token:"
        Write-Output $invalidJson

        "`n⚠️ Unexpected Response for ${username} with invalid token:`n$invalidJson`n" | Out-File -Append -FilePath $logPath
    } catch {
        Write-Host "`n✅ Invalid Token Test Passed - Expected 401 Unauthorized"
        Write-Host $_.Exception.Message
        "`n✅ Invalid Token Test (User: ${username}) - Error:`n$($_.Exception.Message)`n" | Out-File -Append -FilePath $logPath
    }
}

# Main Execution
Write-Host "`n======================================="
Write-Host "Starting JWT Authentication Tests..."
Write-Host "=======================================`n"

# Run tests
Test-JWTAuthentication -username "Zsolt" -password "password123"
Test-JWTAuthentication -username "admin" -password "adminpassword"

Write-Host "`n======================================="
Write-Host "Authentication Tests Complete."
Write-Host "Logs saved to ${logPath}"
Write-Host "=======================================`n"
