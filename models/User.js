const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}] // массив ссылок. здесь происходит связка данного поля с какой-то моделью данных (с моделью Link)
});

module.exports = model('User', schema);