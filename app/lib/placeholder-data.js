const consumers = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6441a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const providers = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    title: 'Lawyer',
    description: 'sad',
    speciality: 'sadasa',
  },
];

const requests = [
  {
    requestId: '410544b2-4001-4271-9855-fec4b6a6444a',
    consumerId: '410544b2-4001-4271-9855-fec4b6a6441a',
    providerId: '410544b2-4001-4271-9855-fec4b6a6442a',
    desciption: 'sdaasd',
  },
];

module.exports = {
  consumers,
  providers,
  requests,
};
