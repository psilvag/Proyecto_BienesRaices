AL INICIAR UN NUEVO PROYECTO 

npm init        // lo configuras todo
npm init -y     // mas simplificado

instalar express
npm i express

instalar pug
npm i pug

instalar nodemon
npm i -D nodemon


INSTALACION DE TAILWIND PARA MANEJARLO CON EXPRESS Y NODE

1. Ejecutamos

npm i -D tailwindcss autoprefixer postcss postcss-cli  

2. Creamos una carpeta public para tailwind y en index.js colocamos
app.use(express.static('public'))

3. Creamos un archivo tailwind.css en la ruta public/css
4. Dentro del archivo tailwind.css colocamos sus tres directivas (configuracion de tailwind)

@tailwind base;
@tailwind components;
@tailwind utilities;

5. Ejecutamos 
npx tailwindcss init -p

esto creara 2 archivos: postcss.config.cjs y tailwind.config.cjs

6. En tailwind.config.cjs configuramos la ruta hacia nuestros views colocando en:

content:['./views/**/*.pug']

7. Abrimos el package.json y creamos un nuevo script: (compila el archivo de tailwind dentro de public
como app.css)

"css":"postcss public/css/tailwind.css -o public/css/app.css --watch"  
El watch hace que no tengamo que ejecutar todo el tiempo "npm run css" cada vex que hagamos un cambio al 
a los archivos pug de views solo lo ejecutamos una vez y ya 

8. Ejecutamos 

npm run css

Esto crea un archivo app.css en la ruta public/css/app.css



PARA INSTALAR EL ORM SEQUELIZE, se debe instalar MYSQL en la PC

npm i sequelize mysql2


PARA PROTEGER LA INFORMACION DE LA BASE DE DATOS, INSTALAR DEPENDENCIA DE PRODUCCION
 npm i dotenv

PARA REALIZAR VALIDACIONES EN LA ENTRADA DE DATOS UTILIZAMOS UNA DEPENDENCIA DE PRODUCCION DE EXPRESS INSTALANDO 
npm i express-validator

PARA HASHEAR LOS PASSWORDS UTILIZAMOS INSTALAMOS UNA DEPENDENCIA  DE PRODUCCION , EL HASHEO ES EN EL MODELO
npm i bcrypt


PARA PROBAR EL ENVIO DE EMAILS USAMOS LA APLICACION MAILTRAP
SIRVE PARA PROBAR LOS EMAILS MAILTRAP.COM
1. INGRESAR A SANDBOX
2. INBOXES
3. ADDINBOX
4. NOMBRE DEL PROYECTO (SOLO PERMITE AÑADIR UN NUEVO SANDBOX, LUEGO ES DE PAGA)
5. CLICK EN EL NOMBRE DE PROYECTO CREADO
6. SELECCIONAR NODEMAILER DE INTEGRATIONS
7. COPIAR ESAS CREDENCIALES AL ARCHIVO .ENV 
// para ingresar a mailtrap.io me loguee con el correo mmusk100@gmail.com
PARA NODE SOLO EXISTE NODEMAILER

INSTALAR DEPENDENCIA
npm i nodemailer


PARA HABILITAR LA PROTECCION CSFR INSTALAMOS
npm i csurf cookie-parser

PARA  AUTENTICAR UN USUARIO NODEJS TIENE MUCHAS FORMAS 
POR EJEMPLO: 
- Keycloak  ------> npm i keycloak-js
- passport  ------> npm i passport
- jsonwebtoken ----> npm i 

PARA CARGAR EL MAPA EN MI APLICACION USAMOS 
-LEAFLET UNA ALTERNATIVA GRATIS A GOOGLE


PARA COMPILAR LOS ARCHIVOS JS Y CONVERTIRLOS EN ARCHIVOS ESTATICOS USAREMOS WEBPACK 
-npm i -D webpack webpack-cli
LUEGO EN EL PACKAGE JASON COLOCAR:
"js":"webpack --watch"

PARA NO TENER TANTAS TERMINALES ABIERTAS INSTALAMOS UNA DEPENDENCIA DE DESARROLLO
PERMITE QUE CSS Y JAVASCRIPT SE COMPILEN EN UNO SOLO
npm i -D concurrently


EJECUCION DEL PROYECTO: 
en una terminal los webPacks 
           npm run dev 

en otra terminal , ejecución de la base de datos
           npm run server 

credenciales para entrar al sistema: 

