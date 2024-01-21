# Pasos realizados 
.
### Esqueleto
- Se crea un esqueleto para el proyecto de la siguiente manera:
    - app
        - config
        - controllers
        - middleware
        - models
        - routes
    - public
        - css
        - html
        - js
    - server.js
<br>
- En cada carpeta se crean las distintas funcionalidades, es decir, la gestión de rutas, la creación del middleware (uso de Jwt, token...), además de crear los controladores y los archivos de configuración de la BBDD
<br>
### Diferencias entre entregas
- En la primera entrega se realiza el trabajo con SQL y Sequelize, sin embargo en la segunda se realiza con MongoDB y Mongoose, con lo que hay que modificar los distintos documentos del proyecto, como por ejemplo los modelos. 
Con SQL tienen la siguiente estructura:
```
const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
```
Mientras que al utilizar mongo en la segunda entrega, hay que modificarlo:
```
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 60
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});
```

- Además de esto, también hay que hacer modificaciones en otros archivos tales como los controladores y la configuración de la bnase de datos

<hr>

# Funcionamiento de la app

Página de login con 2 botones:

- Botón de crear usuario
    - Abre un nuevo formulario para crear usuario introduciendo usuario, contraseña, email y elegir el rol
        - No se ha creado el usuario correctamente (error)
            - Avisa del error para poder cambiarlo
        - Si se crea usuario correctamente, sale una alerta y vuelve al formulario de login

- Botón de Iniciar sesión
    - Envía una petición POST al servidor, enviando usuario y contraseña a /api/auth/signin
    - Recoge el token enviado y lo guarda en local storage, y se redirige a /dashboard

Tras hacer login correctamente se pasa a la página de dashboard:
- Un botón que al hacer click hace lo siguiente
    - Comprueba el token
        - Si no hay token envía una alerta que primero hay que hacer login para conseguir el token (de esta manera, evitamos que usuarios accedan a localhost:8080/dashboard y puedan ver el contenido sin haber hecho login anteriormente)
        - Si hay token, hace una petición a la api para ver qué tiene que mostrar en pantalla (comprobando los permisos que tiene con ese token previamente), dependiendo del rol da unos datos u otros, y estos se muestran modificando el body del html

# Requisitos para que funcione la segunda entrega
1. Tener instalado mongo, con una colección testdb creada

2. Descargar los modulos de node
```node
npm install
```

3. Ejecutar el server
```node
node server.js
```


