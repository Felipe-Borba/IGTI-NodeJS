import OwnerRepository from "../repository/owner.js";
import AnimalRepository from "../repository/animal.js";

async function createOwner(owner) {
  return await OwnerRepository.createOwner(owner);
}

async function updateOwner(owner) {
  return await OwnerRepository.updateOwner(owner);
}

async function deleteOwner(ownerId) {
  const petList = await AnimalRepository.getAnimalListByOwner(ownerId);

  if (petList.length < 0) {
    throw new Error(
      "can't delete owner with pet, first delete pet register of this owner"
    );
  }

  return await OwnerRepository.deleteOwner(ownerId);
}

async function getOwnerList() {
  return await OwnerRepository.getOwnerList();
}

async function getOwnerById(ownerId) {
  return await OwnerRepository.getOwnerById(ownerId);
}

export default {
  createOwner,
  updateOwner,
  deleteOwner,
  getOwnerList,
  getOwnerById,
};
