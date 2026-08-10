# Backend de la cartilla (Google Apps Script)

El sitio es estático y no tiene servidor. Los registros de descarga y las
consultas se guardan en una planilla de Google mediante este script, publicado
como aplicación web.

## Desplegar por primera vez

1. Crear una planilla nueva en <https://sheets.new>. Ponerle un nombre
   reconocible, por ejemplo *Cartilla avícola — registros*.
2. En el menú: **Extensiones → Apps Script**.
3. Borrar el contenido de `Código.gs` y pegar el de [`Codigo.gs`](Codigo.gs).
   Guardar.
4. Botón **Implementar → Nueva implementación**.
5. En el engranaje de tipo, elegir **Aplicación web**.
6. Configurar así, que es lo único que importa:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** **Cualquier persona**
7. Implementar. Google pide autorización la primera vez: aceptar. Aparece la
   advertencia de "app no verificada" — es tu propio script, entrar por
   *Configuración avanzada → Ir a (nombre del proyecto)*.
8. Copiar la **URL de la aplicación web**. Termina en `/exec`.

Esa URL va en `index.html`, en la constante `ENDPOINT` del bloque de script.

Para comprobar que quedó bien, abrir la URL en el navegador: debe responder
`{"ok":true,"mensaje":"Backend de la cartilla avícola activo."}`.

## Al modificar el script

Los cambios en el código **no se aplican solos**. Hay que ir a
**Implementar → Administrar implementaciones**, editar la existente con el lápiz
y elegir **Versión: Nueva versión**. Así la URL `/exec` no cambia.

Si en cambio se crea una implementación nueva desde cero, la URL cambia y hay
que actualizar `ENDPOINT` en `index.html`.

## Qué se guarda

Dos hojas, creadas automáticamente la primera vez que llega un dato de cada tipo:

| Hoja | Columnas |
|---|---|
| `registro` | fecha, nombre, mail, localidad, provincia, pais, organizacion, consulta, archivo |
| `consulta` | fecha, nombre, mail, texto |

`archivo` es el material que la persona quiso descargar cuando se registró.
`consulta` en la hoja `registro` es el campo opcional de consultas o sugerencias
del propio formulario de descarga; la hoja `consulta` es otra cosa, son los
mensajes que llegan por el logo flotante.

### Al cambiar las columnas

El encabezado se escribe **solo cuando la hoja se crea**. Si la hoja ya existe y
se agrega o mueve una columna en `HOJAS`, las filas nuevas se guardan en el orden
nuevo bajo el encabezado viejo y quedan mal rotuladas. Hay que borrar la pestaña
para que se recree con el encabezado correcto.

## Límite conocido

El registro es una puerta de cortesía, no un control de acceso. Los archivos
están en URLs públicas del repositorio y quien las conozca los descarga sin
pasar por el formulario. Para que la puerta sea real, los archivos tendrían que
salir del repositorio y servirse desde otro lado.
