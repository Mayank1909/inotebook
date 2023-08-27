const express = require('express');
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require('express-validator');


// Route  1 : get all the notes  suing GET "/api/notes/getuser Login required"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error")
    }
})
// Route  2 : Add a new node using post uing POST "/api/notes/getuser Login required"


router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', " Description must be at least 5 characters ").isLength({ min: 5 }),

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error")
    }
})
// Route 3: updating an existing note using PUT "/api/notes/update" login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        // creatr annew object
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = title;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // find the note to be update and update it

        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error")
    }
})

// Route 4: delete an existing note using DELTE "/api/notes/deletenote" login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    // find the note to be deleted and delete it
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { res.status(404).send("Not found") }

        // alloe deleteion only if user owns this
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success ": " ntoe has ben delte " });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal servers Error")
    }
})


module.exports = router