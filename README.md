# :clipboard: Project.Mehrass
This app will display a list words from the Moroccan :morocco: dialect and their meaning, it's a dictionary like website.
With the possibility for users to join add and update more words on the fly!

Made using the MERN stack with Docker!

*MERN stands for Mongo, Express, React and NodeJS*

# :globe_with_meridians: Demo
This app is deployed and hosted on Heroku with CI/CD enabled :
[Run app live demo](https://project-mehrass.herokuapp.com/)

# :floppy_disk: Database
MongoDB Atlas is mongoDB as a service, where the whole cluster is completely managed by mongoDB. and we can just concentrate on the application.

More information can be found here : [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

# :hash: Enviroment Variables
In ```/server``` directory, create ```.env``` file and have the following variables :
```
PORT=5000
NODE_ENV=production
DEBUG=false
MONGO_URI={YOUR_MONGODB_ATLAS_URI}
SECRET={YOUR_SECRET}
```

# :repeat: Developement
In the root directory run this command :

``` docker-compose -f docker-compose.dev.yml up --build ```

# :repeat_one: Production
In the root directory as well, run the following :

``` docker-compose up --build ```

# :computer: Technologies Used
* Nodejs, Express, JWT
* MongoDB, MongoDB Atlas, Mongoose
* React, Redux, Webpack, Axios, CKEditor
* Docker, Docker Compose
* Git, Trello
* Heroku

## :memo: License
[MIT](https://opensource.org/licenses/MIT)
