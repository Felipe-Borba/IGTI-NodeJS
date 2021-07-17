import AnimalRepository from "../repository/animal.js";

async function createAnimal(animal) {
  return await AnimalRepository.createAnimal(animal);
}

async function updateAnimal(animal) {
  return await AnimalRepository.updateAnimal(animal);
}

async function deleteAnimal(animalId) {
  return await AnimalRepository.deleteAnimal(animalId);
}

async function getAnimalList(ownerId) {
  if (ownerId) {
    return await AnimalRepository.getAnimalListByOwner(ownerId);
  }
  return await AnimalRepository.getAnimalList();
}

async function getAnimalById(animalId) {
  return await AnimalRepository.getAnimalById(animalId);
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalList,
  getAnimalById,
};
