# **App Name**: BARA Connect

## Core Features:

- User Authentication: User authentication via Firebase Auth as described in https://github.com/yattara-solutions/bara-backend .
- Job Listings: Display a list of job opportunities fetched from the backend (https://github.com/yattara-solutions/bara-backend).
- Course Listings: Display a list of training courses fetched from the backend (https://github.com/yattara-solutions/bara-backend).
- AI Chatbot: Allow users to interact with a chatbot for career advice using the /api/ai/ask endpoint described in the documentation for https://github.com/yattara-solutions/bara-backend.
- Contextual Keyword Extraction: Uses a tool to analyze the user's query to identify keywords related to job skills and training courses.
- Personalized Recommendations: Based on identified keywords, the AI suggests relevant training courses and job opportunities to the user, by cross-referencing job listings and training course catalogs provided by the linked backend: https://github.com/yattara-solutions/bara-backend.

## Style Guidelines:

- Primary color: #2E4A62 (HSL: 213, 37%, 29%) – A deep, muted blue to convey trust, professionalism, and stability, inspired by BARA's mission to empower individuals through job opportunities and training. This darker shade works well for a light or dark UI.
- Background color: #F0F2F5 (HSL: 220, 20%, 95%) – An off-white background that provides a clean and neutral surface, ensuring readability and focus on the content.  The hue is subtly desaturated to stay harmonious with the primary color.
- Accent color: #468189 (HSL: 195, 30%, 41%) – A teal-leaning accent color that provides contrast and highlights key interactive elements, drawing attention to important actions and information. The hue is close to the primary for harmony, but is brighter.
- Body font: 'PT Sans', a humanist sans-serif font known for its legibility, to ensure comfortable reading across devices.
- Headline font: 'Space Grotesk', a sans-serif font with a modern and techy feel, used for headlines to capture attention. For longer text, this pairs well with PT Sans.
- Use clean, modern icons from a consistent set (e.g., Font Awesome or Material Design Icons) to represent categories, actions, and other UI elements.
- Implement a grid-based layout to maintain a structured and organized presentation of content. Employ white space effectively to prevent clutter and improve visual hierarchy.