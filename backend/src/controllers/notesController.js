import Note from "../models/NOte.js"


export const getNotes = async (_, res)=>{   // if not using any args or params replace by _
    try {
        const notes = await Note.find().sort({createdAt: -1});   // -1 to get the newest first and 1 to created first at first(fifo)
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNotes" ,error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getNoteById = async (req, res) =>{
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message : "Note does not exist"});
        res.status(200).send(note);
    } catch (error) {
        console.error("Error in getNoteById" ,error);
        res.status(500).json({message: "Internal Server Error"})
    }
}
export const createNotes = async (req, res) =>{
    try{
        const {title, content} = req.body;
        const note = new Note({title, content});
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    }catch(error){
        console.error("Error in createNotes controller");
        res.status(500).json({message: "Internal server error"});
    }
    
}

export const updateNotes = async (req, res) =>{
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content},{new: true});
        if (!updatedNote) return res.status(404).json({message: " Note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNotes controller");
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteNotes = async (req, res) =>{
    try {
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote) return res.status(404).json({message: " Note not found"});
        res.status(200).json({message: "Note deleted sucessfully"});
    } catch (error) {
        console.error("Error in deleteNotes controller");
        res.status(500).json({message: "Internal server error"});
    }
    
}