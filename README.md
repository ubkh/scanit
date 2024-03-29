# ScanIt

## Deployed version
The deployed version of the web application can be found at *[https://scanit-pubjeemobail.surge.sh](https://scanit-pubjeemobail.surge.sh)*.

## Prerequisites
- Expo Go app on mobile device.
- Modern version of NodeJS and Git.

## Installation instructions
To install the software and use it in your local development environment, you must first set up a a local development environment.  

### Backend
From the root of the project:

```
$ virtualenv venv
$ source venv/bin/activate
```

Install all required packages:

```
$ pip3 install -r requirements.txt
```

Migrate the database:

```
$ python3 manage.py migrate
```

Seed the development database with:

```
$ python3 manage.py seed
```

To start the development server:

```
$ python3 manage.py runserver <YOUR_IP>:8000
```

If running locally, this IP must be in the form ```192.168.X.X``` - found in Network Settings.
*(eg. 192.168.1.208:8000)*

Run all tests with:
```
$ python3 manage.py test
```

### Frontend

From the frontend root (```frontend/scanit```):

```
$ npm install
```

Create a ```.env.local``` file at the frontend root and add to its contents:

```
DJANGO="<YOUR_DJANGO_IP>:8000"
PROTOCOL="https"
```

If running locally IP must be in the form ```192.168.X.X``` - found in Network Settings, and PROTOCOL should be "http".
*(eg. DJANGO=192.168.1.208:8000)*

To start the development server:

```
$ npm start
```

Run all tests with:
```
$ npm test
```

Run tests and watch changes:
```
$ npm test -- --watch
```

## Sources
The packages used by this application are specified in `requirements.txt` for the backend and in the `dependencies` section of `frontend/scanit/package.json` for the frontend.

## Authors
Team *Pubjee Mobail*:
- Ubayd Khan ([ubayd.khan@kcl.ac.uk](ubayd.khan@kcl.ac.uk))
- Muhammad (Abdullah) Beg ([muhammad.beg@kcl.ac.uk](muhammad.beg@kcl.ac.uk))
- Syed Mudassir (Mudassir) Ahmad ([syed.m.ahmad@kcl.ac.uk](syed.m.ahmad@kcl.ac.uk))
- Sayedul (Sayed) Alam ([sayedul.alam@kcl.ac.uk](sayedul.alam@kcl.ac.uk))
- Ghaith Allajmi ([ghaith.allajmi@kcl.ac.uk](ghaith.allajmi@kcl.ac.uk))
- Nizom Badal ([nizom.badal@kcl.ac.uk](nizom.badal@kcl.ac.uk))
- Shafiul (Mehdi) Islam-Mehdi ([shafiul.islam-mehdi@kcl.ac.uk](shafiul.islam-mehdi@kcl.ac.uk))
- Abed Talukdar ([abed.talukdar@kcl.ac.uk](abed.talukdar@kcl.ac.uk))