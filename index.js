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
          "This is a notification app to give recurring updates on the price of popular Forex symbols",
        app_logo:
          "https://my-portfolio-343207.web.app/MyLogo4.png",
        app_name: "Samex Forex API",
        app_url: `${baseUrl}`,
        background_color: "#50C878",
      },
      integration_category: "Monitoring & Logging",
      integration_type: "interval",
      is_active: true,
      key_features: [
        "Forex",
        "Updates.",
        "News"
      ],
      settings: [
        { label: "site-1", type: "text", required: true, default: "" },
        { label: "site-2", type: "text", required: true, default: "" },
        {
          label: "interval",
          type: "text",
          required: true,
          default: "* * * * *",
        },
      ],
      tick_url: `${baseUrl}/tick`,
      target_url: "",
    },
  };
  return res.json(integration);
});


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
