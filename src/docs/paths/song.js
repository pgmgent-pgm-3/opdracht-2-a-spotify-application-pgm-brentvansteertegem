/**
 * The Song paths
 */

import songResponse from './responses/Song.js';

export default {
  '/song': {
    summary: 'Send a request to the server to create a new song.',
    description:
      'Send a request to the server with your desired information in order to create a new song.',
    post: {
      tags: ['Songs'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SongInput',
            },
          },
        },
      },
      responses: songResponse,
    },
  },
  '/songs': {
    summary: 'Get all the songs',
    description: 'Get all the songs in the database...',
    get: {
      tags: ['Songs'],
      responses: {
        200: {
          description: 'Fetching song was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Songs',
                },
              },
            },
          },
        },
      },
    },
  },
  '/song/{id}': {
    summary: 'Manipulate an existing song',
    description: 'Manipulate an existing song...',
    get: {
      tags: ['Songs'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The song Id',
        },
      ],
      responses: {
        200: {
          description: 'Fetching song was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Songs',
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ['Songs'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The song Id',
        },
      ],
      responses: songResponse,
    },
    delete: {
      tags: ['Songs'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'The song Id',
        },
      ],
      responses: {
        200: {
          description: 'Deleting song was a success!',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Songs',
                },
              },
            },
          },
        },
      },
    },
  },
};
