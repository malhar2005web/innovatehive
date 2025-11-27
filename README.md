# innovatehive
🚀 InnovateHive - Digital Future Agency Website

InnovateHive is a modern, high-performance agency website built with Flask (Python) and vanilla HTML/CSS/JS. It features an award-winning "Awwwards" style aesthetic with glassmorphism, micro-interactions, and AI integration.

✨ Key Features

🎨 Modern UI/UX:

Glassmorphism Design: Frosted glass effects on cards and containers.

Custom Cursor: Magnetic cursor interaction for buttons and links.

Noise Texture: Cinematic film grain overlay for a premium feel.

Interactive Background: Dynamic lighting that follows mouse movement.

⚡ Animations:

Powered by GSAP (GreenSock) for smooth scroll triggers and text reveals.

AOS (Animate On Scroll) for element fade-ins.

🤖 AI Chatbot:

Integrated Gemini AI chatbot for answering user queries in real-time.

Custom chat UI with typing indicators.

📱 Fully Responsive:

Mobile-first design ensuring compatibility across all devices.

Smooth mobile navigation menu.

🔗 Smart Navigation:

Scroll Spy: Navbar active state updates automatically as you scroll.

Dynamic Detail Pages: Dedicated pages for Services and Projects (/service/<id>).

🛠️ Tech Stack

Backend: Python, Flask

Frontend: HTML5, CSS3, JavaScript (ES6+)

Animations: GSAP, ScrollTrigger, AOS

AI Integration: Google Gemini API

Deployment Ready: Gunicorn (for production)

📂 Folder Structure

/innovatehive
│
├── app.py                 # Main Flask Application
├── data.py                # Data storage (Services, Projects, Blogs)
├── Procfile               # For Render Deployment
├── requirements.txt       # Python Dependencies
├── README.md              # Project Documentation
│
├── static/                # Static Assets
│   ├── css/
│   │   └── style.css      # Main Stylesheet
│   ├── js/
│   │   └── script.js      # Animations & Logic
│   └── images/            # Images & Icons
│
└── templates/             # HTML Templates
    ├── home.html          # Main Landing Page
    └── service_detail.html # Dynamic Detail Page


🚀 Getting Started (Local Setup)

Follow these steps to run the project on your machine.

1. Clone the Repository

git clone [https://github.com/your-username/innovatehive.git](https://github.com/your-username/innovatehive.git)
cd innovatehive


2. Create a Virtual Environment (Recommended)

# Windows
python -m venv .venv
.venv\Scripts\activate

# Mac/Linux
python3 -m venv .venv
source .venv/bin/activate


3. Install Dependencies

pip install -r requirements.txt


4. Configure API Key

Open static/js/script.js and replace the placeholder with your actual Gemini API Key:

const apiKey = "YOUR_GEMINI_API_KEY_HERE";


5. Run the App

python app.py


Visit http://127.0.0.1:5000/ in your browser.

☁️ Deployment (Render)

This project is configured for easy deployment on Render.

Push your code to GitHub.

Go to dashboard.render.com.

Click New + -> Web Service.

Connect your GitHub repo.

Build Command: pip install -r requirements.txt

Start Command: gunicorn app:app

Click Deploy.

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project.

Create your Feature Branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the Branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📄 License

Distributed under the MIT License. See LICENSE for more information.

<p align="center">Made with ❤️ by Malhar</p>