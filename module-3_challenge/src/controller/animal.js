import AnimalService from "../service/animal.js";

async function createAnimal(req, res, next) {
  try {
    let animal = req.body;

    if (!animal.nome || !animal.tipo || !animal.proprietarioId) {
      throw new Error("nome, tipo, proprietarioId are missing");
    }

    animal = await AnimalService.createAnimal(animal);
    res.send(animal);

    logger.info(`POST /owner - ${JSON.stringify(animal)}`);
  } catch (error) {
    next(error);
  }
}

async function updateAnimal(req, res, next) {
  try {
    let animal = req.body;

    if (
      !animal.animalId ||
      !animal.nome ||
      !animal.tipo ||
      !animal.proprietarioId
    ) {
      throw new Error("animalId, nome, tipo, proprietarioId are missing");
    }

    animal = await AnimalService.updateAnimal(animal);
    res.send(animal);

    logger.info(`PUT /owner`);
  } catch (error) {
    next(error);
  }
}

async function deleteAnimal(req, res, next) {
  try {
    const animalId = req.params.id;

    await AnimalService.deleteAnimal(animalId);

    res.end();

    logger.info(`DELETE /owner`);
  } catch (error) {
    next(error);
  }
}

async function getAnimalList(req, res, next) {
  try {
    const ownerId = req.query.proprietarioId;

    res.send(await AnimalService.getAnimalList(ownerId));

    logger.info(`GET /owner`);
  } catch (error) {
    next(error);
  }
}

async function getAnimalById(req, res, next) {
  try {
    const animalId = req.params.id;

    res.send(await AnimalService.getAnimalById(animalId));

    logger.info(`GET /owner/${animalId}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalList,
  getAnimalById,
};
