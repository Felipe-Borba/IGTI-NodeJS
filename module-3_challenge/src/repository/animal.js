import Animal from "../models/animal.js";

async function createAnimal(animal) {
  return await Animal.create(animal);
}

async function updateAnimal(animal) {
  await Animal.update(animal, {
    where: {
      animalId: animal.animalId,
    },
  });

  return await getAnimalById(animal.animalId);
}

async function deleteAnimal(animalId) {
  await Animal.destroy({
    where: {
      animalId,
    },
  });

  return "ok";
}

async function getAnimalList() {
  return await Animal.findAll();
}

async function getAnimalById(animalId) {
  return await Animal.findByPk(animalId);
}

async function getAnimalListByOwner(proprietarioId) {
  return await Animal.findAll({
    where: {
      proprietarioId,
    },
  });
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalList,
  getAnimalById,
  getAnimalListByOwner,
};
