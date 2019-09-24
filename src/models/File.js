const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    path: {
        type: String,
        required: true
    },
    files: []
}, {
    timestamps: true,
    toObject : { virtuals: true},
    toJSON : { virtuals: true}
});

//campo virtual, não existe no mongo

File.virtual('url').get(function (){
  return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
})
module.exports = mongoose.model("File", File);
