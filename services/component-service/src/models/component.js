// component-service/src/models/Component.js
const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    component_id: { //  Component_ID(String) 
        type: String,
        required: true,
        unique: true,
    },
    name: { //  name(String)
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco al inicio y final
    },
    version: { // version(String)
        type: String,
        required: true,
        trim: true
    },
    download_count: { // download_count(Number)
        type: Number,
        default: 0 // Empieza en 0 descargas
    },
    updated_at: { // updated_at(DateTime)
        type: Date,
        default: Date.now // 
    },
});

const Component = mongoose.model('Component', componentSchema);

module.exports = Component;