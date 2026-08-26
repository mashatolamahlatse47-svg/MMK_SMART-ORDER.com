<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MMK Groceries – Order on WhatsApp</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 420px;
      margin: 40px auto;
      padding: 20px;
      background: #f4f4f4;
    }
    h1 {
      text-align: center;
      margin-bottom: 8px;
    }
    .info {
      background: white;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.5;
    }
    button {
      background: #25D366;
      color: white;
      border: none;
      padding: 16px 24px;
      font-size: 18px;
      font-weight: bold;
      border-radius: 12px;
      width: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    button:hover {
      background: #1ebe57;
    }
  </style>
</head>
<body>

  <h1>🛒 MMK Groceries</h1>

  <div class="info">
    <strong>How to test:</strong><br>
    1. Open <code>script.js</code><br>
    2. Change the WhatsApp number<br>
    3. Click the green button below
  </div>

  <button onclick="placeOrderOnWhatsApp()">
    📱 Place Order on WhatsApp
  </button>

  <!-- This line connects your script.js file -->
  <script src="script.js"></script>

</body>
</html>
