import OwnerService from "../service/owner.js";

async function createOwner(req, res, next) {
  try {
    let owner = req.body;

    if (!owner.name || !owner.phone) {
      throw new Error("name and phone are missing");
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

    if (!owner.owner_id || !owner.name || !owner.phone) {
      throw new Error("owner_id, name, phone are missing");
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
    const owner_id = req.params.id;

    await OwnerService.deleteOwner(owner_id);

    res.end();

    logger.info(`DELETE /owner/${owner_id}`);
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
    const owner_id = res.params.id;

    res.send(await OwnerService.getOwnerById(owner_id));

    logger.info(`get /owner/${owner_id}`);
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
