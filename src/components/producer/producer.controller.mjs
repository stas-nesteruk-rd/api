import HTTP_STATUS from 'http-status';
import {
    getProducers,
    saveProducer,
    deleteProducer,
    updateProducer
} from './producer.service';

export async function getProducersTreatment(req, res) {
    try {
        const producers = await getProducers();
        res.status(HTTP_STATUS.OK).send(producers);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function deleteProducerTreatment(req, res) {
    const id = req.params.id;
    try {
        deleteProducer(id);
        res.status(HTTP_STATUS.OK).send();
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function updateProducerTreatment(req, res) {
    const id = req.params.id;
    try {
        if (!req.body.name) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send();
        }
        const producer = await updateProducer(id, req.body.name);
        res.status(HTTP_STATUS.OK).send(producer);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}

export async function createProducerTreatment(req, res) {
    try {
        if (!req.body.name) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send();
        }
        const producer = await saveProducer(req.body.name);
        res.status(HTTP_STATUS.CREATED).send(producer);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
    }
}
