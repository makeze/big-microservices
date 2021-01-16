import mongoose from 'mongoose';

interface UserAttrs {
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
    return new User(attrs);
}

buildUser({
   email: "123",
   password: "321"
});

export { User, buildUser };