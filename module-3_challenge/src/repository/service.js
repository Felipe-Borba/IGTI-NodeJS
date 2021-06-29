import Service from "../models/service.js";

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

export default {
  createService,
  updateService,
  deleteService,
  getServiceList,
  getServiceById,
};
