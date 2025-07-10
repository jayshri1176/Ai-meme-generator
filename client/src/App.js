import { useState, useEffect } from 'react';
import './index.css';

const funnyCaptions = [
  "Me after socializing for five minutes: I need a month to recover. 😵🛌",
  "I’m not lazy, I’m conserving energy. 🔋😴",
  "When you wave and the person wasn’t waving at you. 👋😬",
  "My phone battery lasts longer than my patience. 🔋🤯",
  "I’m on a see-food diet. I see food and eat it. 🍔👀",
  "When you accidentally hit “reply all.” 📧😳",
  "Me when someone says “calm down.” Calm was never here. 😤🙅‍♀️",
  "I’m not short. I’m fun-sized. 💁‍♂️✨",
]
;

function App() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/memes')
      .then((res) => res.json())
      .then((data) => setMemes(data))
      .catch(console.error);
  }, []);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }

  function generateCaption() {
    const randomIndex = Math.floor(Math.random() * funnyCaptions.length);
    setCaption(funnyCaptions[randomIndex]);
  }

  async function saveMeme() {
    if (!image) {
      setMessage('Please upload an image first.');
      return;
    }
    if (!caption) {
      setMessage('Please add a caption first.');
      return;
    }

    // Send meme data to backend
    const response = await fetch('http://localhost:5000/api/memes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image, caption }),
    });

    const data = await response.json();
    setMessage(data.message);

    // Refresh memes list
    fetch('http://localhost:5000/api/memes')
      .then((res) => res.json())
      .then((data) => setMemes(data))
      .catch(console.error);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Meme Generator</h1>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <br /><br />

      <input
        type="text"
        placeholder="Enter your meme caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{ width: '300px', padding: '8px', fontSize: '16px' }}
      />

      <button
        onClick={generateCaption}
        style={{ marginLeft: '10px', padding: '8px' }}
      >
        AI Generate Caption
      </button>

      <button
        onClick={saveMeme}
        style={{ marginLeft: '10px', padding: '8px' }}
      >
        Save Meme
      </button>

      {image && (
        <div
          style={{
            marginTop: '20px',
            position: 'relative',
            display: 'inline-block',
            maxWidth: '400px',
          }}
        >
          <img
            src={image}
            alt="Uploaded"
            style={{ width: '100%', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              textShadow: '2px 2px 4px black',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {caption}
          </div>
        </div>
      )}

      {message && (
        <div style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>
          {message}
        </div>
      )}

      <h2 style={{ marginTop: '40px' }}>Saved Memes (999+)</h2>

      <div className="meme-grid">
        {memes.map((meme) => (
          <div className="meme-card" key={meme._id}>
            <img src={meme.image} alt="Meme" />
            <div className="meme-caption">
              {meme.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;




