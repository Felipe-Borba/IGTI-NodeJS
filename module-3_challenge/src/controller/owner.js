import OwnerService from "../service/owner.js";

async function createOwner(req, res, next) {
  try {
    let owner = req.body;

    if (!owner.nome || !owner.telefone) {
      throw new Error("nome and telefone are missing");
    }

    owner = await OwnerService.createOwner(owner);
    res.send(owner);

    logger.info(`POST /owner - ${owner}`);
  } catch (error) {
    next(error);
  }
}

async function updateOwner(req, res, next) {
  try {
    let owner = req.body;

    if (!owner.proprietarioId || !owner.nome || !owner.telefone) {
      throw new Error("proprietarioId, nome, telefone are missing");
    }

    owner = await OwnerService.updateOwner(owner);
    res.send(owner);

    logger.info(`PUT /owner`);
  } catch (error) {
    next(error);
  }
}

async function deleteOwner(req, res, next) {
  try {
    const ownerId = req.params.id;

    await OwnerService.deleteOwner(ownerId);

    res.end();

    logger.info(`DELETE /owner/${ownerId}`);
  } catch (error) {
    next(error);
  }
}

async function getOwnerList(req, res, next) {
  try {
    res.send(await OwnerService.getOwnerList());

    logger.info(`GET /owner`);
  } catch (error) {
    next(error);
  }
}

async function getOwnerById(req, res, next) {
  try {
    const ownerId = req.params.id;

    res.send(await OwnerService.getOwnerById(ownerId));

    logger.info(`get /owner/${ownerId}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createOwner,
  updateOwner,
  deleteOwner,
  getOwnerList,
  getOwnerById,
};
