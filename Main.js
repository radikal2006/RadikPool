const express = require('express');
const { Translate } = require('@google-cloud/translate');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port, default to 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Initialize Google Cloud Translate API with credentials
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // Use environment variable for project ID
});

// Handle text translation requests
app.post('/translate/text', async (req, res) => {
  const { text, targetLanguage } = req.body;

  // Basic input validation
  if (!text || !targetLanguage) {
    return res.status(400).json({ message: 'Missing text or target language' });
  }

  try {
    const [translation] = await translate.translate(text, targetLanguage);
    res.json({ translation });
  } catch (error) {
    console.error(`Error translating text: ${error.message}`);
    res.status(500).json({ message: 'Translation failed' });
  }
});

// Handle speech translation requests
app.post('/translate/speech', async (req, res) => {
  const { speech, targetLanguage } = req.body;

  // Basic input validation
  if (!speech || !targetLanguage) {
    return res.status(400).json({ message: 'Missing speech or target language' });
  }

  try {
    // In a real-world scenario, you would need to integrate with a speech-to-text service here
    const [translation] = await translate.translate(speech, targetLanguage);
    res.json({ translation });
  } catch (error) {
    console.error(`Error translating speech: ${error.message}`);
    res.status(500).json({ message: 'Translation failed' });
  }
});

// Start the Express application
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
