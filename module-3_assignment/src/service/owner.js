import OwnerRepository from "../repository/owner.js";
import AnimalRepository from "../repository/animal.js";

async function createOwner(owner) {
  return await OwnerRepository.createOwner(owner);
}

async function updateOwner(owner) {
  return await OwnerRepository.updateOwner(owner);
}

async function deleteOwner(owner_id) {
  //TODO  verify if owner have a animal registered in his name, if so don't exclude
  return await OwnerRepository.deleteOwner(owner_id);
}

async function getOwnerList() {
  return await OwnerRepository.getOwnerList();
}

async function getOwnerById(owner_id) {
  return await OwnerRepository.getOwnerById(owner_id);
}

export default {
  createOwner,
  updateOwner,
  deleteOwner,
  getOwnerList,
  getOwnerById,
};
