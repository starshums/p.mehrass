require('dotenv').config();
const mongoose = require('mongoose');

// Mongoose setup
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (error) => {
    if(error) throw error;
    console.log("MongoDB connection established!");
});

const db = require('./models');

const users = [
  { email: 'hamza@gmail.com', password: 'password' },
  { email: 'shums@gmail.com', password: 'password' }
];

const words = [{ text: "ara" }];

const posts = [
  { text: 'Who is the best mutant' },
  { text: 'Truth or dare' },
  { text: 'Boolean?' }
];

const seed = async () => {
  try {
    await db.User.deleteMany();
    console.log('DROP ALL USERS');

    await db.Post.deleteMany();
    console.log('DROP ALL POSTS');

    await db.Word.deleteMany();
    console.log('DROP ALL WORDS');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));

    await Promise.all(
        words.map(async word => {
          const data = await db.Word.create(word);
          await data.save();
        }),
    );
    console.log('CREATED WORDS', JSON.stringify(users));

    await Promise.all(
      posts.map(async postItem => {
        const word = await db.Word.findOne({ text: 'ara' });
        postItem.word = word;
        const post = await db.Post.create(postItem);
        const user = await db.User.findOne({ email: 'hamza@gmail.com' });
        post.user = user;
        user.posts.push(post._id);
        word.posts.push(post._id);
        await user.save();
        await post.save();
        await word.save();
      }),
    );
    console.log('CREATED posts', JSON.stringify(posts));
  } catch (err) {
    console.error(err);
  }
};

seed();