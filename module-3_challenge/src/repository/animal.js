import Animal from "../models/animal.js";
import Owner from "../models/owner.js";

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
  return await Animal.findAll({
    include: [
      {
        model: Owner,
      },
    ],
  });
}

async function getAnimalById(animalId) {
  // return await Animal.findOne({
  //   where: { animalId },
  //   include: [
  //     {
  //       model: Owner,
  //     },
  //   ],
  // });
  return await Animal.findByPk(animalId, {
    include: [
      {
        model: Owner,
      },
    ],
  });
}

async function getAnimalListByOwner(proprietarioId) {
  return await Animal.findAll({
    where: {
      proprietarioId,
    },
    include: [
      {
        model: Owner,
      },
    ],
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
