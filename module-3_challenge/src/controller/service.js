import ServiceRepository from "../service/service.js";

async function createService(req, res, next) {
  try {
    let service = req.body;
    if (!service.descricao || !service.valor || !service.animalId) {
      throw new Error("descricao, valor, animalId are missing");
    }

    service = await ServiceRepository.createService(service);
    res.send(service);

    logger.info(`POST /service - ${JSON.stringify(service)}`);
  } catch (error) {
    next(error);
  }
}

async function getServiceList(req, res, next) {
  try {
    const filter = { ...req.query };

    res.send(await ServiceRepository.getServiceList(filter));
    logger.info(`GET /service`);
  } catch (error) {
    next(error);
  }
}

async function getServiceById(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await ServiceRepository.getServiceById(id));

    logger.info(`GET /service/${id}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createService,
  getServiceList,
  getServiceById,
};
