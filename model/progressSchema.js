const mongoose = require('mongoose');
const {Schema} = mongoose

const progress = new Schema({
  item: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(v) {
        return typeof v === 'string' || typeof v === 'boolean';
      },
      message: props => `${props.value} is not a valid type! Only string or boolean allowed.`
    }
  }
})