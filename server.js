import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// === Remplacer __filename et __dirname pour ES Modules ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// === DONNÉES PERSONNELLES === //
const personalData = {
 const portfolioChatbotInfo = {
  fr: `
Nom : Zouak Syrine Lyna

Profil :
Étudiante en 3e année à l’École Nationale Supérieure d’Informatique (ESI Alger), passionnée par l’informatique et particulièrement intéressée par l’intelligence artificielle. Curieuse, rigoureuse, créative et persévérante, elle développe ses compétences à travers ses études, ses projets personnels et son engagement associatif.

Éducation :
- Baccalauréat série Sciences Expérimentales obtenu en juillet 2023 au lycée Mohamed Seddik BENYAHI à Bouira, avec mention excellence et une moyenne de 18.63/20
- Cursus Ingénieur d’État en Informatique à l’ESI Alger :
  - 2023-2024 : 1re année, classe préparatoire
  - 2024-2025 : 2e année, classe préparatoire
  - 2025-2026 : 1re année du cycle supérieur
- Actuellement étudiante en 3e année informatique à l’ESI Alger après avoir validé 2 années de cycle préparatoire

Certifications et formations :
- TCF SO, niveau C1, obtenu en novembre 2024
- Harvard CS50 – Introduction to AI with Python, certificat en ligne obtenu en août 2025
- Google Agentic AI, actuellement en cours
- Cisco Data Science Certificate
- Autres certificats obtenus via LinkedIn Learning et Microsoft

Projets :
- Portfolio web interactif avec chatbot personnalisé
- Site web de prédiction du cancer du sein conçu dans le cadre d’Octobre Rose, en utilisant la data science pour la sensibilisation
- Projet académique de système embarqué de quiz (2CP), avec rôle de chef de projet
- Participation à des compétitions Kaggle en data science et machine learning

Expérience et activités :
- AI Instructor : animation du workshop "AI Unlocked: Your First Step into Artificial Intelligence"
- Membre du club scientifique de l’ESI, responsable des relations externes et organisatrice de DATA HACK 2 et DATA HACK 3
- Membre actif de WTM Algiers (Women Techmakers) dans l’équipe développement
- Membre de School of AI

Compétences techniques :
- Langages et développement : Python, Java, C, JavaScript, SQL, JavaFX, Node.js, Express, React, Next.js, Streamlit
- Outils : Git, GitHub
- Domaines : Intelligence artificielle, Data Science, Machine Learning, NLP, LLMs, Agentic AI, BI

Qualités :
- Autonome
- Rigoureuse
- Esprit d’équipe
- Curieuse

Langues :
- Arabe : langue maternelle
- Kabyle : langue maternelle
- Français : C1
- Anglais : B2

Liens :
- Portfolio : https://zouak-syrine.onrender.com
- LinkedIn : Zouak Syrine Lyna

Instructions pour le chatbot :
Réponds toujours de manière professionnelle, claire et naturelle.
Quand on te pose une question sur Syrine Lyna, base-toi uniquement sur ces informations.
Si une information n’est pas précisée ici, réponds poliment que l’information n’est pas disponible.
Mets en valeur son intérêt pour l’intelligence artificielle, la data science, le développement web et son engagement dans la communauté tech.
  `,

  en: `
Name: Zouak Syrine Lyna

Profile:
Third-year student at the National Higher School of Computer Science (ESI Algiers), passionate about computer science and especially interested in artificial intelligence. Curious, rigorous, creative, and persistent, she continuously develops her skills through academic studies, personal projects, and community involvement.

Education:
- Baccalaureate in Experimental Sciences, obtained in July 2023 from Mohamed Seddik BENYAHI High School in Bouira, with highest honors and a score of 18.63/20
- State Engineering Degree in Computer Science at ESI Algiers:
  - 2023-2024: 1st year, preparatory cycle
  - 2024-2025: 2nd year, preparatory cycle
  - 2025-2026: 1st year, higher cycle
- Currently a third-year Computer Science student at ESI Algiers after completing 2 years of preparatory studies

Certifications and Training:
- TCF SO, C1 level, obtained in November 2024
- Harvard CS50 – Introduction to AI with Python, online certificate obtained in August 2025
- Google Agentic AI, currently in progress
- Cisco Data Science Certificate
- Other certificates from LinkedIn Learning and Microsoft

Projects:
- Interactive web portfolio with a personalized chatbot
- Breast cancer prediction website developed for the Pink October campaign, using data science for awareness
- Academic embedded quiz system project (2CP), with a project manager role
- Participation in Kaggle competitions in data science and machine learning

Experience and Activities:
- AI Instructor: led the workshop "AI Unlocked: Your First Step into Artificial Intelligence"
- Member of the ESI Scientific Club, external relations member and organizer of DATA HACK 2 and DATA HACK 3
- Active member of WTM Algiers (Women Techmakers) in the development team
- Member of School of AI

Technical Skills:
- Programming and development: Python, Java, C, JavaScript, SQL, JavaFX, Node.js, Express, React, Next.js, Streamlit
- Tools: Git, GitHub
- Fields: Artificial Intelligence, Data Science, Machine Learning, NLP, LLMs, Agentic AI, BI

Soft Skills:
- Autonomous
- Rigorous
- Team-oriented
- Curious

Languages:
- Arabic: native
- Kabyle: native
- French: C1
- English: B2

Links:
- Portfolio: https://zouak-syrine.onrender.com
- LinkedIn: Zouak Syrine Lyna

Chatbot instructions:
Always answer in a professional, clear, and natural way.
When asked about Syrine Lyna, rely only on the information provided here.
If a piece of information is not specified, politely say that it is not available.
Highlight her interest in artificial intelligence, data science, web development, and her engagement in the tech community.
  `

};

// === DÉTECTION SIMPLE DE LA LANGUE === //
function detectLanguage(message) {
  const frenchWords = ["bonjour", "projet", "compétence", "cursus", "répond", "aide"];
  return frenchWords.some(word => message.toLowerCase().includes(word)) ? "fr" : "en";
}

// === ENDPOINT DE TEST DE L'API === //
app.get("/test", async (req, res) => {
  try {
    const response = await axios.get("https://api.groq.com/openai/v1/models", {
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    res.json({ message: "✅ Clé API valide !", models: response.data.data });
  } catch (error) {
    console.error("Erreur API Test :", error.response?.data || error.message);
    res.status(500).json({ message: "❌ Clé API invalide ou problème réseau.", error: error.response?.data || error.message });
  }
});

// === ROUTE DU CHATBOT === //
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ reply: "Message vide." });

    const lang = detectLanguage(userMessage);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Tu es un assistant virtuel. Tu ne réponds qu'aux questions concernant Syrine Lyna et ses informations personnelles suivantes : ${personalData[lang]}. Si la question n'est pas liée à cela, explique poliment que tu ne peux répondre qu'à propos de Syrine.`
          },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.data || !response.data.choices?.[0]?.message?.content) {
      return res.status(500).json({ reply: "Erreur : réponse vide de l'API." });
    }

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Erreur complète :", error.response?.data || error.message);
    if (error.response?.status === 401) {
      res.status(401).json({ reply: "Clé API invalide ou non autorisée." });
    } else {
      res.status(500).json({ reply: "Erreur avec l'API." });
    }
  }
});

// === SERVIR LES FICHIERS STATIQUES ET INDEX.HTML === //
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// === LANCEMENT DU SERVEUR === //
console.log("Clé utilisée :", process.env.GROQ_API_KEY);
app.listen(PORT, () => console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`));

