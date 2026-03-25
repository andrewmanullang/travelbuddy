# 🌍 Travel Buddy - AI Travel Assistant

A modern, AI-powered travel chatbot that helps users plan their perfect trip. Built with a beautiful, responsive interface and powered by Google's Gemini AI.

![Travel Buddy Interface](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)

## ✨ Features

- 💬 **Conversational AI** - Natural language travel planning powered by Google Gemini
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 🗺️ **Travel Expertise** - Get itineraries, budget tips, hidden gems, and safety advice
- 📱 **Mobile Friendly** - Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Context Awareness** - Maintains conversation history for personalized recommendations
- ⚡ **Real-time Responses** - Fast API responses with automatic retry logic

## 🚀 Demo

Ask Travel Buddy questions like:
- "Plan a 5-day itinerary for Tokyo on a budget"
- "What are some hidden gems in Paris?"
- "Best time to visit Bali?"
- "Family-friendly activities in Barcelona"

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)
- A [Google AI Studio](https://aistudio.google.com/) API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travel-buddy.git
   cd travel-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file and add your API key:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   MODEL=gemini-3.1-flash-lite-preview
   PORT=3000
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Copy the key and paste it in your `.env` file

## 🎯 Usage

1. **Start the backend server**

   Make sure to run this from the **root directory** of the project so that your `.env` file loads correctly. We recommend using `nodemon` for automatic restarts during development:
   
   ```bash
   npx nodemon server/index.js
   ```
   
   You should see:
   ```
   Listening on port 3000
   ```

2. **Open the frontend**
   
   Open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server (install first: npm install -g http-server)
   http-server -p 8000
   ```
   
   Then navigate to `http://localhost:8000`

3. **Start chatting!**
   
   Type your travel questions in the input box and get AI-powered recommendations.

## 📁 Project Structure

```
travel-buddy/
├── index.js              # Backend API server
├── index.html            # Frontend HTML structure
├── script.js             # Frontend JavaScript logic
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
├── package.json          # Node.js dependencies
└── README.md            # Project documentation
```

## 🔧 Configuration

### Backend Configuration (`index.js`)

The backend uses Express.js and the Google Generative AI SDK:

- **Port**: Default is 3000 (configurable via `.env`)
- **Model**: Uses `gemini-3.1-flash-lite-preview` (configurable via `.env`)
- **CORS**: Enabled for frontend communication
- **Temperature**: Set to 0.9 for creative responses

### Frontend Configuration (`script.js`)

- **API_URL**: Points to `http://localhost:3000/api/chat`
- **Retry Logic**: 3 retries with exponential backoff
- **Rate Limit Handling**: Automatic retry on 429 responses

## 🌐 API Endpoints

### `POST /api/chat`

Sends a message to the AI and receives a response.

**Request Body:**
```json
{
  "conversation": [
    { "role": "user", "text": "Plan a trip to Paris" },
    { "role": "model", "text": "I'd love to help you plan..." }
  ]
}
```

**Response:**
```json
{
  "result": "Here's a wonderful 5-day Paris itinerary..."
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## 🎨 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **TailwindCSS** - Utility-first styling
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Plus Jakarta Sans typography

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Generative AI SDK** - AI integration
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📦 Dependencies

```json
{
  "dependencies": {
    "@google/genai": "^latest",
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0"
  }
}
```

## 🚧 Troubleshooting

### Backend Issues

**Port already in use:**
```bash
# Change the port in .env
PORT=3001
```

**API Key errors:**
- Verify your API key is correct in `.env`
- Ensure you have API access enabled in Google AI Studio
- Check for any billing or quota issues

### Frontend Issues

**CORS errors:**
- Ensure the backend is running on port 3000
- Check that CORS is enabled in `index.js`

**Connection refused:**
- Verify the backend server is running
- Check that `API_URL` in `script.js` matches your backend port

**No response from AI:**
- Check browser console for errors
- Verify network requests in DevTools
- Ensure your API key has not exceeded quota

## 🔐 Security Notes

- **Never commit your `.env` file** - Add it to `.gitignore`
- **Use `.env.example`** - Template file is included for easy setup
- **API Key Protection** - Keep your Gemini API key private
- **Rate Limiting** - The app includes retry logic for rate limits
- **Input Validation** - Backend validates conversation data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powering the intelligence
- [TailwindCSS](https://tailwindcss.com/) for the styling framework
- [Express.js](https://expressjs.com/) for the backend framework

## 📧 Contact

Project Link: [https://github.com/andrewmanullang/travelbuddy](https://github.com/andrewmanullang/travelbuddy)

## 🗺️ Roadmap

- [ ] Add location search with maps integration
- [ ] Save favorite destinations
- [ ] Export itineraries to PDF
- [ ] Multi-language support
- [ ] Weather integration
- [ ] Flight and hotel price tracking
- [ ] User authentication and saved conversations

---

Made with ❤️ for travelers worldwide
