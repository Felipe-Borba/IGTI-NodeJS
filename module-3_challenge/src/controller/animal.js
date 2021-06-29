import AnimalService from "../service/animal.js";

async function createAnimal(req, res, next) {
  try {
    let animal = req.body;

    if (!animal.name || !animal.specie || !animal.owner_id) {
      throw new Error("name, specie, owner_id are missing");
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
      !animal.animal_id ||
      !animal.name ||
      !animal.specie ||
      !animal.owner_id
    ) {
      throw new Error("animal_id, name, specie, owner _id are missing");
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
    const animal_id = req.params.id;

    await AnimalService.deleteAnimal(animal_id);

    res.end();

    logger.info(`DELETE /owner`);
  } catch (error) {
    next(error);
  }
}

async function getAnimalList(req, res, next) {
  try {
    const owner_id = req.query.owner_id;

    res.send(await AnimalService.getAnimalList(owner_id));

    logger.info(`GET /owner`);
  } catch (error) {
    next(error);
  }
}

async function getAnimalById(req, res, next) {
  try {
    const animal_id = req.params.id;

    res.send(await AnimalService.getAnimalById(animal_id));

    logger.info(`GET /owner/${animal_id}`);
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
