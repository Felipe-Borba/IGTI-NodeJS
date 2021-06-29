import Service from "../models/service.js";
import Animal from "../models/animal.js";
import Owner from "../models/owner.js";

async function createService(service) {
  return await Service.create(service);
}

async function updateService(service) {
  await Service.update(service, {
    where: {
      serviceId: service.serviceId,
    },
  });

  return await getServiceById(service.animalId);
}

async function deleteService(serviceId) {
  await Service.destroy({
    where: {
      serviceId,
    },
  });

  return "ok";
}

async function getServiceList() {
  return await Service.findAll();
}

async function getServiceById(serviceId) {
  return await Service.findByPk(serviceId);
}

async function getServiceListByOwner(proprietarioId) {
  return await Service.findAll({
    include: [
      {
        model: Animal,
        where: {
          proprietarioId,
        },
      },
    ],
  });
}

export default {
  createService,
  updateService,
  deleteService,
  getServiceList,
  getServiceById,
  getServiceListByOwner,
};
