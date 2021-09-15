# Tech Notes Plus

## Environment Setup

### Backend

#### This project uses python 3.8.10

After cloning the repository, create .env file in the root directory

Place the value of these variable:
```
export SECRET_KEY=django-insecure-*l(=lvspyv07^8hssee+pkxsp1yg@2oylnwhpbnrwiu$tv0+2v
export SENDGRID_API_KEY=sendgrid-api-key #your sendgrid api key
```
Change DEFAULT_FROM_EMAIL value from technotesplus/settings.py

After creating and activating the virtual environment run the following command to install all the packages.

```
pip install -r requirements.txt
```
Migrate and run the project with the following command

```
python manage.py migrate
python manage.py runserver
```
### Frontend
#### This project uses Node 14.10.0 and npm 7.23.0
Navigate to frontend directory
```
cd frontend
```
Install all the packages using this command
```
npm install
```
(optional)You can change base api url if you want from frontend/src/configs/configs.js. I put http://127.0.0.1:8000/

Run project with the following command
```
npm start
```
| :heavy_check_mark:  Project is deployed on Heroku. [View Project](https://technotesplus.herokuapp.com/)|
|----------------------------------------------------------------------------------------------------------|

Access API documentation using **base-api-url/docs/** like http://127.0.0.1:8000/docs/ or [See Here](https://technotesplus.herokuapp.com/docs/)
