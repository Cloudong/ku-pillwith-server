const options = {
    swaggerDefinition: {
      openapi: '3.0.3',
      info: {
        title: 'API Docs.',
        version: '1.0.0',
        description: 'API 문서입니다.',
      },
      servers: [
        {
          url: 'http://3.39.227.185:3001',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  module.exports = options;