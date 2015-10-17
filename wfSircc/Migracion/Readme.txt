Para la correcta migración de la base de datos, seguir las siguientes instrucciones:

1- Se debe instalar una base de datos en la que tenemos alguna información necesaria.
	
	- Navegar a la carpeta "BaseDatosMigracion". 
	- Entrar al Toad con el usuario System
	- Ejecutar el script "CreaTableSpaceMigracion.sql". Creará el Table Space
	- Ejecutar el script "CreateUserMigracion.sql". Creará el usuario de la base de datos
	- Ejecutar el archivo "ImportarSirccMigracion.bat". Importará la base

2- Modificar la base de datos.

	- Entrar al Toad con el usuario dueño de la base de datos Sircc
	- Navegar a la carpeta "ScriptsSirccOrden".
	- Ejecutar el script "Ejecutar.sql". Ajustara la base de datos