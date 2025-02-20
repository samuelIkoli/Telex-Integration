const express = require("express");
const https = require("https");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

async function TwelveDemo(base, quote) {
  const demoKey = "3086f380e87b4353a4fd98f1a2c71b42";
  const url = `https://api.twelvedata.com/time_series?symbol=${base}/${quote}&interval=1day&apikey=${demoKey}`;

  if (base === quote) {
    return 1;
  } else {
    try {
      const response = await axios.get(url);
      return response.data?.values?.[0]?.close || "Rate error";
    } catch (error) {
      console.error(`❌ Error fetching rate for ${base}/${quote}:`, error.message);
      return "Rate error";
    }
  }
}

// Simple route
app.get("/", (req, res) => {
  return res.send("Hello, World! 🌍");
});

app.get("/integration", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const integration = {
    data: {
      date: {
        created_at: "YYYY-MM-DD",
        updated_at: "YYYY-MM-DD",
      },
      descriptions: {
        app_description:
          "SSL-Sentinel periodically check the SSL certificates of provided websites, and reports the SSL expiration date for the website",
        app_logo:
          "https://i.pinimg.com/736x/9a/6c/12/9a6c121be8cc5b037526f9922b956db1.jpg",
        app_name: "SSL-Sentinel SAM",
        app_url: `https://ssl-sentinel-delicate-silence-8135.fly.dev/integration.json`,
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
      tick_url: `https://ssl-sentinel-delicate-silence-8135.fly.dev/tick`,
      target_url: "",
    },
  };
  return res.json(integration);
});



app.post('/tick', async (req, res) => {
  async function Get_symbols(req, res) {
    const payload = req.body || {};
    if (!payload || Object.keys(payload).length === 0) {
      console.log("⚠️ No payload supplied, proceeding without it...");
    }
  
    const symbols = [
      "GBPUSD", "EURJPY",
      "EURUSD", "EURCHF",
      "USDCHF", "EURGBP",
      "USDCAD", "AUDCAD",
    ];
  
    let results = "📈 **Forex Exchange Rates**\n--------------------------\n";
  
    try {
      const promises = symbols.map(async (symbol) => {
        const base = symbol.slice(0, 3);
        const quote = symbol.slice(3);
        const exchangeRate = await TwelveDemo(base, quote);
        return `${base}/${quote} → 💹 Rate: ${exchangeRate}`;
      });
  
      const rates = await Promise.all(promises);
      results += rates.join("\n");
  
      console.log(results);
  
      const telex_data = {
        message: results,
        username: "Samex Forex Update",
        event_name: "Forex Update",
        status: "success",
      };
  
      const telex_url = process.env.TELEX_WEBHOOK;
      try {
        const telresponse = await axios.post(telex_url, telex_data);
        console.log("✅ Telex response:", telresponse.data);
        res.status(200).json(telex_data);
      } catch (error) {
        console.error("❌ Failed to post to Telex URL:", error.message);
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      console.error("❌ Error processing symbols:", error.message);
      res.status(500).json({ error: "Server error while processing symbols." });
    }
  }
});

app.get('/tick', async (req, res) => {
  async function Get_symbols(req, res) {
    const payload = req.body || {};
    if (!payload || Object.keys(payload).length === 0) {
      console.log("⚠️ No payload supplied, proceeding without it...");
    }
  
    const symbols = [
      "GBPUSD", "EURJPY",
      "EURUSD", "EURCHF",
      "USDCHF", "EURGBP",
      "USDCAD", "AUDCAD",
    ];
  
    let results = "📈 **Forex Exchange Rates**\n--------------------------\n";
  
    try {
      const promises = symbols.map(async (symbol) => {
        const base = symbol.slice(0, 3);
        const quote = symbol.slice(3);
        const exchangeRate = await TwelveDemo(base, quote);
        return `${base}/${quote} → 💹 Rate: ${exchangeRate}`;
      });
  
      const rates = await Promise.all(promises);
      results += rates.join("\n");
  
      console.log(results);
  
      const telex_data = {
        message: results,
        username: "Samex Forex Update",
        event_name: "Forex Update",
        status: "success",
      };
  
      const telex_url = process.env.TELEX_WEBHOOK;
      try {
        const telresponse = await axios.post(telex_url, telex_data);
        console.log("✅ Telex response:", telresponse.data);
        res.status(200).json(telex_data);
      } catch (error) {
        console.error("❌ Failed to post to Telex URL:", error.message);
        res.status(500).json({ error: error.message });
      }
    } catch (error) {
      console.error("❌ Error processing symbols:", error.message);
      res.status(500).json({ error: "Server error while processing symbols." });
    }
  }
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
