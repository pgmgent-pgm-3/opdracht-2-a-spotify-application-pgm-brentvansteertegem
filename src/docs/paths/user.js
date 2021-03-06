/**
 * The User paths
 */

import userResponse from './responses/User.js';

export default {
  '/users': {
    summary: 'Get all the users',
    description: 'Get all the users in the database...',
    get: {
      tags: ['Users'],
      responses: {
        200: {
          description: 'Fetching users was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/{id}': {
    summary: 'Manipulate an existing user',
    description: 'Manipulate an existing user...',
    get: {
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The user Id',
        },
      ],
      responses: userResponse,
    },
    delete: {
      tags: ['Users'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The user Id',
        },
      ],
      responses: userResponse,
    },
  },
};
