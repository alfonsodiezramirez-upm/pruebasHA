# Blind Control Card

Custom card de Lovelace para controlar entidades `cover` de Home Assistant, pensada para persianas, estores o cortinas motorizadas.

## Ejemplo

```yaml
type: custom:blind-control-card
entity: cover.persiana_salon
name: Persiana Salon
```

`name` es opcional. Si no se indica, la tarjeta usa `friendly_name` y, como ultimo recurso, el `entity_id`.

## Funciones

- Web Component con Lit y TypeScript.
- Contenedor `ha-card`.
- Barra vertical de posicion de 0 a 100 usando `current_position`.
- Botones `Subir`, `Parar` y `Bajar`.
- Servicios usados:
  - `cover.open_cover`
  - `cover.stop_cover`
  - `cover.close_cover`
  - `cover.set_cover_position` con `position`
- Mensajes claros si falta `entity` o si la entidad no existe.
- Estilos basados en variables de tema de Home Assistant.

## Desarrollo

Instala dependencias y genera el archivo final:

```bash
npm install
npm run build
```

El build crea:

```text
dist/blind-control-card.js
```

## Instalacion manual

1. Ejecuta `npm run build`.
2. Copia `dist/blind-control-card.js` a:

   ```text
   /config/www/community/blind-control-card/blind-control-card.js
   ```

3. En Home Assistant, ve a `Ajustes > Paneles > Recursos` y anade:

   ```text
   /local/community/blind-control-card/blind-control-card.js
   ```

   Tipo: `JavaScript module`.

4. Usa la tarjeta en Lovelace:

   ```yaml
   type: custom:blind-control-card
   entity: cover.persiana_salon
   name: Persiana Salon
   ```

## Instalacion con HACS

1. Publica este proyecto en un repositorio de GitHub.
2. Genera el build con `npm run build`.
3. Publica `dist/blind-control-card.js` como asset de una release con el nombre `blind-control-card.js`.
4. En HACS, anade el repositorio como `Custom repository` de categoria `Lovelace`.
5. Instala la tarjeta desde HACS.
6. Si Home Assistant no anade el recurso automaticamente, anade este recurso:

   ```text
   /hacsfiles/blind-control-card/blind-control-card.js
   ```

   Tipo: `JavaScript module`.

## Configuracion

| Opcion | Tipo | Requerida | Descripcion |
| --- | --- | --- | --- |
| `entity` | string | Si | Entidad `cover` que se va a controlar. |
| `name` | string | No | Nombre mostrado en la parte superior. |

## Notas

La barra de posicion necesita que la entidad exponga `current_position`. Si no existe ese atributo, la tarjeta sigue mostrando los botones de subir, parar y bajar, pero desactiva la barra.
