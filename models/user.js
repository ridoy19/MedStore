const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: email => {
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return reg.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: [true, 'User email address required'],
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    password: {
        type: String,
        minlength: [5, 'Minimum password length is 5 characters'],
        required: [true, 'User password required'],
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: phone => {
                const reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
                return reg.test(phone);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: true
    },
    order_history: {
        type: Array,
        default: []
    },
    // prescription: {
    //     type: String
    // },
    isAdmin: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})


// Hash password before saving a user
// If password modified only then this middleware will work

UserSchema.pre('save', async function (next) {
    try {
        if (this.password && this.isModified('password')) {
            // Check if password is present and is modified
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        }
        return next();
    } catch (error) {
        return next(error)
    }

})


// UserSchema.method.validatePassword = async data => {
//     return bcrypt.compare(data, this.password);
// }

module.exports = mongoose.model('User', UserSchema);