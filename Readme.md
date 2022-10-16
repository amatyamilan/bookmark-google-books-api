# BOOKMARK GOOGLE BOOKS API

Based on adonis js framework v5 and mysql.

### Install the dependencies

```
npm install
```

### env file from .env.example and fill the env variables

```
cp .env .env.example
```

### Environment Variables

| Variable Name    | Description                                                                        |
| ---------------- | ---------------------------------------------------------------------------------- |
| PORT             | Port to run the application                                                        |
| HOST             | Host url where the application is hosted                                           |
| NODE_ENV         | Application Environment i.e. development/staging/production                        |
| APP_KEY          | Application secret key                                                             |
| DB_CONNECTION    | Database connection type i.e. mysql                                                |
| MYSQL_HOST       | MYSQL host                                                                         |
| MYSQL_PORT       | MYSQL port                                                                         |
| MYSQL_USER       | MYSQL user name                                                                    |
| MYSQL_PASSWORD   | MYSQL user password                                                                |
| MYSQL_DB_NAME    | MYSQL database name                                                                |
| REDIS_CONNECTION | Redis connection                                                                   |
| REDIS_HOST       | Redis host                                                                         |
| REDIS_PORT       | Redis port                                                                         |
| REDIS_PASSWORD   | Redis password                                                                     |
| GOOGLE_API_KEY   | Google books api key                                                               |
| PAGINATION_LIMIT | Application Pagination Limit, maximum allowable value is 40 for google search API. |

### Run application

```
node ace migration:run
npm run dev
```

### Prject Folder Structure

The folder sturcture are based on adonis js framework. Extra folders added which are were not included in adonis are as follows:

| Folder                   | Description                                       |
| ------------------------ | ------------------------------------------------- |
| app/constants            | All constants used in application are stored here |
| app/DTOs                 | Interfaces used in application are stored here    |
| app/Helpers              | Application helper functions                      |
| app/Services             | Service file used in application                  |
| app/Strategies           | Stratigies used in application                    |
| app/contracts/interfaces | Services interfaces are placed here               |

### API documentation

[BOOKMARK-GOOGLE-BOOKS-API](https://documenter.getpostman.com/view/5269701/2s847BVGPS)
