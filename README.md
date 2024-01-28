# Grocery Store

> Grocery Store Application

This is a nodejs crud application where you can as a admin create, delete, update or get list of all grocery items & as a user you can get list of all available grocery items and create order to buy grocery items

### Features 🔐:

- Create / Update / Delete Grocery Items
- Create order where you can select multiple items
- get list of all grocery items

### Technologies 💻:

- NodeJS
- ExpressJS
- Postgres

### Add a dotenv file with following key values

```
{
  "PORT": portnumber,
  "USER": your_postgres_user,
  "HOST": your_host,
  "DATABASE": your_database_name,
  "PASSWORD": your_database_password,
  "DB_PORT": your_connection_port
}
```

# Quick Start 🚀

- Below are the steps required to run project
- FYI. You should have DB created in postgres (add configs of that db in env)
- Add dotenv file with fields given in above section
- npm install
- npm run script
- npm run dev

# Few more points

- Import postman collection & then you can use admin / user endpoints.
- For admin endpoints to work make sure to send role:admin in headers
- You are good to go
