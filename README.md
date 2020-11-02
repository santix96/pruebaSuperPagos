# prueba Super Pagos

Proyecto desarrollado como prueba de ingreso a la empresa Super Pagos en pereira.
API para manejo de usuarios infectados.

## Tecnologias
Para esta prueba se utilizo Express, Sequelize y MySql.

## Prerequisitos
Debe tener node instalado en su computador personal
Debe crear una base de datos llamada `prueba_superpagos` en mySql
Debe modificar los datos de conexion a la base de datos desde el archivo de configuracion `./config/config.json`
alli debera agregar su usuario, contraseña y host en Mysql

## Poner en marcha nuestro proyecto
Primeramente tenemos que poner en marcha nuestro gestor de bases de datos Mysql
A continuacion, una vez tengas el respositorio clonado localmente vamos a acceder por consola a la carpeta principal y alli ejecutamos
- `npm install` para inestalar dependencias
- `sequelize db:migrate` Para realizar la migracion de modelos a la base de datos
- `npm start` para iniciar nustro proyecto.

## APIs disponibles
Para probar los servicios tenemos disponibles las siguientes API, recordar que el sistema esta configurado para poblarse inmediatamente inicia y actualiza los datos respectivos a actualizaciones cada 10 minutos

- API 1: `localhost:8000/api/reto1` Esta nos permite listar los datos de usuarios infectados, actualizados, discriminados por edad y genero
- API 2: `localhost:8000/api/infected/create` Esta nos permite ingresar nuevos usuarios infectados en la base de datos
- API 3: `localhost:8000/api/reto2/:sexo?/:estado?/:ciudad_municipio_nom?` Esta url recibe parametros opcionales, el sistema devuelve un objeto con los id_de_casos filtrados en el orden en que se ingresaron los aprametros en la url. De esta forma si variamos el orden de parametros ingresados tambien se ve afectado la visualizacion final de la estructura. ### Nota: los nombres ingresados en la url tienen que ser exactamente iguales a como estan en los registrados en la base de datos ###
Ejemplos API 3:
- `localhost:8000/api/reto2?ciudad_municipio_nom&sexo&estado`
- `localhost:8000/api/reto2?sexo&estado`
- `localhost:8000/api/reto2?sexo&estado&recuperado`
- `localhost:8000/api/reto2?estado`
- Etc...
