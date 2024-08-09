// Create Model for Profiles

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

const PROFILES = {
  getProfiles: async () => {
    try {
      let result = await prisma.profiles.findMany({
        where: {
          isDeleted: false
        },
        orderBy: {
          id: 'asc'
        },
        select: {
          id: true,
          user_id: true,
          identity_type: true,
          identity_number: true,
          address: true
        }
      })
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  getProfile: async (id) => {
    try {
      let result = await prisma.profiles.findUniqueOrThrow({
        where: {
          id: Number(id),
          isDeleted: false
        },
        select: {
          id: true,
          user_id: true,
          identity_type: true,
          identity_number: true,
          address: true
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  createProfile: async (body) => {
    try {
      let identity_number = body.identity_number;

      if (!body.identity_number) {
        identity_number = uuidv4();
      }

      let result = await prisma.profiles.create({
        data: {
          user_id: body.user_id,
          identity_type: body.identity_type,
          identity_number: identity_number,
          address: body.address,
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  updateProfile: async (id, body) => {
    try {
      let identity_number = body.identity_number;

      if (!body.identity_number) {
        identity_number = uuidv4();
      }

      let result = await prisma.profiles.update({
        where: {
          id: Number(id)
        },
        data: {
          user_id: body.user_id,
          identity_type: body.identity_type,
          identity_number: identity_number,
          address: body.address,
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  deleteProfile: async (id) => {
    try {
      let result = await prisma.profiles.update({
        where: {
          id: Number(id)
        },
        data: {
          isDeleted: true
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
};

module.exports = PROFILES;