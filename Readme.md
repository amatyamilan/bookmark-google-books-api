### Install the dependencies
```
npm install
```

### env file from .env.example and fill the env variables
```
cp .env .env.example
```

### Environment Variables
Add required template names in resources/templates/deploy_templates.txt, example:

| Variable Name | Description |
| ------ | ------ |
| PORT | Port to run the application |
| HOST | Host url where the application is hosted |
| NODE_ENV | Application Environment i.e. development/staging/production |
| APP_KEY | Application secret key |
| DB_CONNECTION | Database connection type i.e. mysql |
| MYSQL_HOST | MYSQL host |
| MYSQL_PORT | MYSQL port |
| MYSQL_USER | MYSQL user name |
| MYSQL_PASSWORD | MYSQL user password |
| MYSQL_DB_NAME | MYSQL database name |
| REDIS_CONNECTION | Redis connection |
| REDIS_HOST | Redis host |
| REDIS_PORT | Redis port |
| REDIS_PASSWORD | Redis password |
| GOOGLE_API_KEY | Google books api key |
| PAGINATION_LIMIT | Application Pagination Limit | 


### Run application
```
npm run dev
```