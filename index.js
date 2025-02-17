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
                "settings":[{"label":"customProfaneWords","type":"multi-select","description":"Select custom profane words to track.","required":true,"default":"fuck,shit,ass,bastard,bitch,dick,cock,pussy,damn,fucking,motherfucker,asshole,prick,dumbass,fucktard,shithead"},{"label":"caseSensitivity","type":"checkbox","description":"Enable case-sensitive profanity detection. If checked, 'Fuck' and 'fuck' will be treated differently.","default":false},{"label":"maskingStyle","type":"dropdown","options":["asterisks","dashes","partial"],"description":"Choose how to mask detected profane words.","default":"partial","required":true},{"label":"actionOnDetection","type":"dropdown","options":["flag","block","replace"],"description":"Decide how to handle detected messages.","default":"flag","required":true},{"label":"notificationOnDetection","type":"dropdown","options":["Yes","No"],"description":"Notify admins when a profane message is detected.","default":"No","required":true},{"label":"WebhookUrl","type":"text","description":"Specify the webhook url of the channel to notify admin","default":"https://my-webhook-url.com","required":true},{"label":"maxProfanityCount","type":"number","description":"Set the maximum allowed profane words per message.","default":3,"required":true}],
                "target_url":"https://hooks.slack.com/services/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"}})
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
