import bcrypt from 'bcrypt';
export default function defineUserModel(mongoose, validator) {
    const schema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            gender: {
                type: String,
                required: true,
                trim: true
            },
            firstName: {
                type: String,
                trim: true
            },
            lastName: {
                type: String,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true,
                unique: true,
                validate(value) {
                    if (!validator.isEmail(value)) {
                        throw new Error('Email is invalid');
                    }
                }
            },
            phone: {
                type: String,
                trim: true
            },
            password: {
                type: String,
                required: true,
                trim: true,
                minlength: 7,
                validate(value) {
                    if (value.includes('password')) {
                        throw new Error('Password cannot contain "password"');
                    }
                }
            },
            address: {
                street: {
                    type: String,
                    trim: true
                },
                city: {
                    type: String,
                    trim: true
                }
            },
            role: {
                type: String,
                default: 'user'
            },
            image: {
                type: String,
                required: true,
                trim: true
            },
            tokens: [
                {
                    token: {
                        type: String,
                        required: true
                    }
                }
            ]
        },
        {
            timestamps: true
        }
    );

    schema.virtual('orders', {
        ref: 'Order',
        localField: '_id',
        foreignField: 'userId'
    });

    schema.methods.toJSON = function() {
        const userObject = this.toObject();
        delete userObject.password;
        delete userObject.tokens;
        return userObject;
    };

    schema.pre('save', async function(next) {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 8);
        }
        next();
    });

    const User = mongoose.model('User', schema);
    return User;
}
