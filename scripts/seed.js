const { db } = require('@vercel/postgres');
const {
  requests,
  providers,
  consumers,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedConsumers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS consumers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
      );
    `;

    console.log(`Created "consumers" table`);

    // Insert data into the "users" table
    const insertedConsumers = await Promise.all(
      consumers.map(async (consumer) => {
        const hashedPassword = await bcrypt.hash(consumers.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${consumer.id}, ${consumer.name}, ${consumer.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedConsumers.length} consumers`);

    return {
      createTable,
      consumers: insertedConsumers,
    };
  } catch (error) {
    console.error('Error seeding consumers:', error);
    throw error;
  }
}

async function seedProviders(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS providers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        title VARCAHR(255) NOT NULL,
        description TEXT NOT NULL,
        speciality TEXT NOT NULL,
      );
    `;

    console.log(`Created "providers" table`);

    // Insert data into the "users" table
    const insertedProviders = await Promise.all(
      providers.map(async (provider) => {
        const hashedPassword = await bcrypt.hash(Providers.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${provider.id}, ${provider.name}, ${provider.email}, ${hashedPassword}, ${provider.title}, ${provider.description}, ${provider.speciality})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedProviders.length} providers`);

    return {
      createTable,
      providers: insertedProviders,
    };
  } catch (error) {
    console.error('Error seeding providers:', error);
    throw error;
  }
}

async function seedRequests(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS requests (
        requestId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        consumerId UUID NOT NULL,
        providerId UUID NOT NULL,
        requestDescription TEXT NOT NULL,
      );
    `;

    console.log(`Created "requests" table`);

    // Insert data into the "users" table
    const insertedRequests = await Promise.all(
      requests.map(async (request) => {
        const hashedPassword = await bcrypt.hash(Requests.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${request.id}, ${request.consumerId}, ${request.providerId}, ${request.description})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedRequests.length} requests`);

    return {
      createTable,
      requests: insertedRequests,
    };
  } catch (error) {
    console.error('Error seeding requests:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedConsumers(client);
  await seedProviders(client);
  await seedRequests(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
