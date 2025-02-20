const integration= {
    "data": {
      "date": {
        "created_at": "2025-02-20",
        "updated_at": "2025-02-20"
      },
      "descriptions": {
        "app_description": "This is a notification app to give recurring updates on the price of popular Forex symbols",
        "app_logo": "https://my-portfolio-343207.web.app/MyLogo4.png",
        "app_name": "SAMForexPI",
        "app_url": "https://fun-numbers.onrender.com/telex-webhook",
        "background_color": "#fff"
      },
      "integration_category": "Monitoring & Logging",
      "integration_type": "interval",
      "is_active": true,
      "key_features": [
        "Forex",
        "Updates"
      ],
      "author": "Samuel Ikoli",
      "settings": [
        {
          "label": "interval",
          "type": "text",
          "required": true,
          "default": "* * * * *"
        }
      ],
      "tick_url": "https://fun-numbers.onrender.com/tick",
      "target_url": "https://ping.telex.im/v1/webhooks/01950b90-b1bf-75b7-b9e6-e831fdd18b5f"
    }
  }

  module.exports = integration