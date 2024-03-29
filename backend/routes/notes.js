const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, vaildationResult } = require('express-validator');
const Note = require('../models/Notes');


// ROUTE 1: Get All the notes using: GET  "/api/auth/getuser". Login Require

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// ROUTE 2: Add a note using: POST  "/api/auth/addnote". Login Require

router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters ').isLength({ min: 5 })
], async (req, res) => {

  try {
    const { title, description, tag } = req.body;
    //If there are errors, return Bad request and the errors
    const errors = vaildationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({

      title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()

    res.json(savedNote)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// ROUTE 3: Update an existing Note using: PUT  "/api/auth/updatenote". Login Require
router.put('/updatenote/:id', fetchuser, async (req, res) => {


  const { title, description, tag } = req.body;

  try {
    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// ROUTE 4: Update an existing Note using: DELETE  "/api/auth/deletenote". Login Require
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

  try {
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    //Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id, { $set: newNote }, { new: true })
    res.json({ "Success": "NOte has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})


module.exports = router
