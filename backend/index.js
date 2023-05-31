const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

const uri ='mongodb+srv://bhagashettianita07:infy123@cluster0.e69nypq.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
});
const Image = mongoose.model('Image', imageSchema);


app.post('/upload', upload.array('images'), async (req, res) => {
  try {
    const images = req.files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    }));
    const savedImages = await Image.create(images);
    console.log("images stored")

    res.status(200).json(savedImages);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
