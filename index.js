const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Simple route
app.get("/", (req, res) => {
  return res.send("Hello, World! 🌍");
});

app.get("/telex-webhook", (req, res) => {
    return res.json({
        "data":{
            "date":{
                "created_at":"2025-02-17",
                "updated_at":"2025-02-17"
            },
            "descriptions":{
                "app_name":"Samex2",
                "app_description":"Trial for notifications",
                "app_logo":"https://my-portfolio-343207.web.app/MyLogo4.png",
                "app_url":"http://13.48.130.169",
                "background_color":"#fff"}, 
                "is_active":true,"integration_type":"modifier",
                "integration_category":"Monitoring & Logging",
                "key_features":["Real time notifications"],
                "author":"Samuel Ikoli",
                "settings":[{
                    "label":"Time interval","type":"dropdown",
                    "description": "Maximum number of recent messages to use as context (default: 50)",
                    "required":true,
                    "default":"Immediate",
                    "options":["Immediate","Every 5 minutes","Every 10 minutes","Every 30 minutes"]
                },
                    {
                    "label": "messageLimit",
                    "type": "number",
                    "description": "Maximum number of recent messages to use as context (default: 50)",
                    "default": 50,
                    "required": false
                    }],
                "target_url":"https://hooks.slack.com/services/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"}})
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
