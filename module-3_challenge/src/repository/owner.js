import Owner from "../models/owner.js";

async function createOwner(owner) {
  return await Owner.create(owner);
}

async function updateOwner(owner) {
  await Owner.update(owner, {
    where: {
      proprietarioId: owner.proprietarioId,
    },
  });

  return await getOwnerById(owner.animalId);
}

async function deleteOwner(proprietarioId) {
  await Owner.destroy({
    where: {
      proprietarioId,
    },
  });

  return "ok";
}

async function getOwnerList() {
  return await Owner.findAll();
}

async function getOwnerById(proprietarioId) {
  return await Owner.findByPk(proprietarioId);
}

export default {
  createOwner,
  updateOwner,
  deleteOwner,
  getOwnerList,
  getOwnerById,
};
