import mongoose from 'mongoose';
import {Password} from "../services/password";

// An interface that describes properties required to create a New User
interface UserAttrs {
    email: string,
    password: string
}

// An interface that describes properties that a new User Model has
interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any;
}

// An interface that describes properties that a new User Document has
interface UserDoc extends mongoose.Document {
    build(attrs: UserAttrs): any;
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
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
        }
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};