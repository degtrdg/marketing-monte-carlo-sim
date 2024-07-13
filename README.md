# Instructions

```
yarn add
cd apps/backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Then, for database/auth features, setup `.env` with 
```
SQLALCHEMY_DATABASE_URL=sqlite:///./backend/sql_app.db (example)
JWT_SECRET=some-jwt-secret
```
