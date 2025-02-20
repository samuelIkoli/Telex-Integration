const express = require("express");
const https = require("https");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());


// Simple route
app.get("/", (req, res) => {
  return res.send("Hello, World! 🌍");
});

app.get("/integration.json", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const integration = {
    data: {
      date: {
        created_at: "2025-02-20",
        updated_at: "2025-02-20",
      },
      descriptions: {
        app_description:
          "SSL-Sentinel periodically check the SSL certificates of provided websites, and reports the SSL expiration date for the website",
        app_logo:
          "https://i.pinimg.com/736x/9a/6c/12/9a6c121be8cc5b037526f9922b956db1.jpg",
        app_name: "SSL-Sentinel",
        app_url: `${baseUrl}`,
        background_color: "#50C878",
      },
      integration_category: "Monitoring & Logging",
      integration_type: "interval",
      is_active: true,
      key_features: [
        "Periodically checks SSL/TLS certificates for expiration.",
        "Sends periodics updates.",
        "Retrieves issuer, validity and encryption details.",
      ],
      settings: [
        { label: "site-1", type: "text", required: true, default: "" },
        { label: "site-2", type: "text", required: true, default: "" },
        {
          label: "interval",
          type: "text",
          required: true,
          default: "*/5 * * * *",
        },
      ],
      tick_url: `${baseUrl}/tick`,
      target_url: "",
    },
  };
  return res.json(integration);
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
                "settings":[{"label":"customProfaneWords","type":"multi-select","description":"Select custom profane words to track.","required":true,"default":"fuck,shit,ass,bastard,bitch,dick,cock,pussy,damn,fucking,motherfucker,asshole,prick,dumbass,fucktard,shithead"},{"label":"caseSensitivity","type":"checkbox","description":"Enable case-sensitive profanity detection. If checked, 'Fuck' and 'fuck' will be treated differently.","default":false},{"label":"maskingStyle","type":"dropdown","options":["asterisks","dashes","partial"],"description":"Choose how to mask detected profane words.","default":"partial","required":true},{"label":"actionOnDetection","type":"dropdown","options":["flag","block","replace"],"description":"Decide how to handle detected messages.","default":"flag","required":true},{"label":"notificationOnDetection","type":"dropdown","options":["Yes","No"],"description":"Notify admins when a profane message is detected.","default":"No","required":true},{"label":"WebhookUrl","type":"text","description":"Specify the webhook url of the channel to notify admin","default":"https://my-webhook-url.com","required":true},{"label":"maxProfanityCount","type":"number","description":"Set the maximum allowed profane words per message.","default":3,"required":true}],
                "target_url":"https://hooks.slack.com/services/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"}})
})

app.get("/telex-webhook2", (req, res) => {
    return res.json({
            "data": {
              "date": {
                "created_at": "2025-02-18",
                "updated_at": "2025-02-18"
              },
              "descriptions": {
                "app_description": "Detects and tracks profane words in all messages.",
                "app_logo": "https://my-portfolio-343207.web.app/MyLogo4.png",
                "app_name": "Sam's Translationary guide",
                "app_url": "https://profanity-checker-omega.vercel.app/api/integration",
                "background_color": "#ffffff"
              },
              "is_active": false,
              "integration_type": "modifier",
              "key_features": [
                "Monitor and filter out offensive language from messages in real-time.",
                "Notify admins when offensive language is detected.",
                "Allow customization of the profanity list and sensitivity settings.",
                "Integrate with chat platforms like Slack and Teams for seamless filtering."
              ],
              "permissions": {
                "events": [
                  "Monitor and filter out offensive language from messages in real-time.",
                  "Notify admins when offensive language is detected.",
                  "Allow customization of the profanity list and sensitivity settings.",
                  "Integrate with chat platforms like Slack and Teams for seamless filtering."
                ]
              },
              "author": "Samuel Ikoli",
              "integration_category": "Communication & Collaboration",
              "website": "https://profanity-checkers.vercel.app",
              "settings": [
                {
                  "label": "customProfaneWords",
                  "type": "multi-select",
                  "description": "Select custom profane words to track.",
                  "required": true,
                  "default": "fuck,shit,ass,bastard,bitch,dick,cock,pussy,damn,fucking,motherfucker,asshole,prick,dumbass,fucktard,shithead"
                },
                {
                  "label": "caseSensitivity",
                  "type": "checkbox",
                  "description": "Enable case-sensitive profanity detection. If checked, 'Fuck' and 'fuck' will be treated differently.",
                  "default": false
                },
                {
                  "label": "maskingStyle",
                  "type": "dropdown",
                  "options": ["asterisks", "dashes", "partial"],
                  "description": "Choose how to mask detected profane words.",
                  "default": "partial",
                  "required": true
                },
                {
                  "label": "actionOnDetection",
                  "type": "dropdown",
                  "options": ["flag", "block", "replace"],
                  "description": "Decide how to handle detected messages.",
                  "default": "flag",
                  "required": true
                },
                {
                  "label": "notificationOnDetection",
                  "type": "dropdown",
                  "options": ["Yes", "No"],
                  "description": "Notify admins when a profane message is detected.",
                  "default": "No",
                  "required": true
                },
                {
                  "label": "WebhookUrl",
                  "type": "text",
                  "description": "Specify the webhook URL of the channel to notify admin.",
                  "default": "https://my-webhook-url.com",
                  "required": true
                },
                {
                  "label": "maxProfanityCount",
                  "type": "number",
                  "description": "Set the maximum allowed profane words per message.",
                  "default": 3,
                  "required": true
                }
              ],
              "target_url": "https://telex-integration.vercel.app/translate"
            }
          })
})

app.post('/translate', async (req, res) => {
  const { message } = req.body;
  target_lang = req.body.target_lang || "fr"
  try {
    const response = await fetch('https://openl-translate.p.rapidapi.com/translate', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'c33b36b6dcmshf7d36d91be00cf4p19da21jsn4a933d53f38c',
        'x-rapidapi-host': 'openl-translate.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message, target_lang }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json({
      "event_name": "message_translated",
      "message": data.translatedText,
      "status": "success",
      "username": "samex_translator"
    });
  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
