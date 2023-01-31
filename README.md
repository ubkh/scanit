# ScanIt

## Deployed version
The deployed version of the application can be found at *<[enter URL here](URL)>*.

## Prerequisites
- Expo Go app on mobile device.
- Modern version of NodeJS and Git.

## Installation instructions
To install the software and use it in your local development environment, you must first set up a local development environment.  

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

Run all tests with:
```
$ python3 manage.py test
```

To start the development server:

```
$ python3 manage.py runserver
```

### Frontend

From the frontend root (```frontend/scanit```):

```
$ npm install
```

To start the development server:

```
$ npx expo start
```

## Sources
The packages used by this application are specified in `requirements.txt` for the backend and in the `dependencies` section of `frontend/scanit/package.json` for the frontend.

## Authors
Team *Pubjee Mobail*:
- Ubayd Khan ([ubayd.khan@kcl.ac.uk](ubayd.khan@kcl.ac.uk))
- Abdullah Beg ([muhammad.beg@kcl.ac.uk](muhammad.beg@kcl.ac.uk))
- Mudassir Ahmad ([syed.m.ahmad@kcl.ac.uk](syed.m.ahmad@kcl.ac.uk))
- Sayed Alam ([sayedul.alam@kcl.ac.uk](sayedul.alam@kcl.ac.uk))
- Ghaith Allajmi ([ghaith.allajmi@kcl.ac.uk](ghaith.allajmi@kcl.ac.uk))
- Nizom Badal ([nizom.badal@kcl.ac.uk](nizom.badal@kcl.ac.uk))
- Shafiul Islam-Mehdi ([shafiul.islam-mehdi@kcl.ac.uk](shafiul.islam-mehdi@kcl.ac.uk))
- Abed Talukdar ([abed.talukdar@kcl.ac.uk](abed.talukdar@kcl.ac.uk))