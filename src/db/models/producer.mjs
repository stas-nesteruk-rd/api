export default function defineProducerModel(mongoose) {
    const schema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            }
        },
        {
            timestamps: true
        }
    );
    const Producer = mongoose.model('Producer', schema);
    return Producer;
}
