import models from '../../db/models';
const { Producer } = models;

export function getProducers() {
    return Producer.find();
}

export function saveProducer(name){
    return new Producer({
        name
    }).save();
}

export async function deleteProducer(_id){
    await Producer.deleteOne({_id});
}

export async function updateProducer(_id, name){
    const producer = await Producer.findOne({_id});
    producer.name = name;
    await producer.save();
    return producer;
}

export function getProducerByName(name){
    return Producer.findOne({name});
}