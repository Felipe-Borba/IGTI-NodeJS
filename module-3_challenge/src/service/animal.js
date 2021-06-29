import AnimalRepository from "../repository/animal.js";

async function createAnimal(animal) {
  return await AnimalRepository.createAnimal(animal);
}

async function updateAnimal(animal) {
  return await AnimalRepository.updateAnimal(animal);
}

async function deleteAnimal(animal_id) {
  return await AnimalRepository.deleteAnimal(animal_id);
}

async function getAnimalList(owner_id) {
  if (owner_id) {
    return await AnimalRepository.getAnimalListByOwner(owner_id);
  }
  return await AnimalRepository.getAnimalList();
}

async function getAnimalById(animal_id) {
  return await AnimalRepository.getAnimalById(animal_id);
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalList,
  getAnimalById,
};
