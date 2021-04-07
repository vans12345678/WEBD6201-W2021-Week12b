import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema
({
    username: String,
    EmailAddress: String,
    DisplayName: String,
    created:
    {
        type:Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }

},
{
    collection: 'users';
});