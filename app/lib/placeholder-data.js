const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    isProvider: true,
    providerData: {
      title: 'Lawyer',
      description: 'sad',
      fields: ['Civil', 'Criminal'],
      speciality: 'sadasa'
    }
  },
];

const requests = [
  {
    consumerId: '410544b2-4001-4271-9855-fec4b6a6442a',
    providerId: '410544b2-4001-4271-9855-fec4b6a6sd442a',
    requestDesciption: 'sdaasd'
  },
];

module.exports = {
  users,
  requests
};
