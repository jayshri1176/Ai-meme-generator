import mongoose from 'mongoose';
import Meme from './Meme.js';

const memes = [
  {
    image: 'https://i.imgflip.com/3tx7te.jpg',
    caption: 'Me after socializing for five minutes: I need a month to recover. 😵🛌',
  },
  {
    image: 'https://i.imgflip.com/5ehzjl.jpg',
    caption: 'I’m not lazy, I’m conserving energy. 🔋😴',
  },
  {
    image: 'https://i.imgflip.com/2hgfw.jpg',
    caption: 'When you wave and the person wasn’t waving at you. 👋😬',
  },
  {
    image: 'https://i.imgflip.com/4acd7j.jpg',
    caption: 'My phone battery lasts longer than my patience. 🔋🤯',
  },
  {
    image: 'https://i.imgflip.com/3si4.jpg',
    caption: 'I’m on a see-food diet. I see food and eat it. 🍔👀',
  },
  {
    image: 'https://i.imgflip.com/1ur9b0.jpg',
    caption: 'When you accidentally hit “reply all.” 📧😳',
  },
  {
    image: 'https://i.imgflip.com/28s2.jpg',
    caption: 'Me when someone says “calm down.” Calm was never here. 😤🙅‍♀️',
  },
  {
    image: 'https://i.imgflip.com/2cp1.jpg',
    caption: 'I’m not short. I’m fun-sized. 💁‍♂️✨',
  },
];

async function seedMemes() {
  try {
    await mongoose.connect(
      'mongodb+srv://jayshrishirsath1176:jayu1176@grocerycluster.kvwwraq.mongodb.net/?retryWrites=true&w=majority&appName=GroceryCluster',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // delete any old memes if you want to start fresh
    await Meme.deleteMany({});
    console.log('Old memes removed.');

    await Meme.insertMany(memes);
    console.log('Memes seeded successfully!');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedMemes();
