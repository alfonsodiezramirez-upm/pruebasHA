# Blind Control Card

Custom card de Lovelace para controlar entidades `cover` de Home Assistant, pensada para persianas, estores o cortinas motorizadas.

## Ejemplo

```yaml
type: custom:blind-control-card
entity: cover.persiana_salon
name: Persiana Salon
size: medium
icon: mdi:blinds
```

`name` es opcional. Si no se indica, la tarjeta usa el nombre de la entidad (`friendly_name`) y, como ultimo recurso, el `entity_id`.

## Funciones

- Web Component con Lit y TypeScript.
- Contenedor `ha-card`.
- Barra vertical de posicion de 0 a 100 usando `current_position`.
- Botones compactos por icono para subir, parar y bajar.
- Editor visual para configurar la tarjeta desde la UI de Lovelace.
- Tamano configurable con `size`, `slider_height`, `slider_width` y `button_size`.
- Modos de visualizacion: slider y botones, solo slider o solo botones.
- Icono opcional duplicado a ambos lados del nombre.
- Colores de fondo configurables para todos los botones o por boton.
- Presets visuales propios con `card_theme`.
- Compatible con entidades `cover` de Shelly 2PM Gen4 cuando el dispositivo esta configurado en Home Assistant como cubierta/persiana.
- Servicios usados:
  - `cover.open_cover`
  - `cover.stop_cover`
  - `cover.close_cover`
  - `cover.set_cover_position` con `position`
- Mensajes claros si falta `entity` o si la entidad no existe.
- Estilos basados en variables de tema de Home Assistant.
- Respeta `supported_features` para desactivar controles no soportados por la entidad.

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
   size: small
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
| `name` | string | No | Nombre mostrado en la parte superior. Si falta, usa el nombre de la entidad. |
| `icon` | string | No | Icono MDI mostrado a ambos lados del nombre, por ejemplo `mdi:blinds`. |
| `size` | `small`, `medium`, `large` | No | Tamano base de la tarjeta. Por defecto: `medium`. |
| `card_theme` | `default`, `minimal`, `filled`, `outline` | No | Preset visual interno de la tarjeta. Por defecto: `default`. |
| `slider_height` | number | No | Altura personalizada de la barra en pixeles, entre `120` y `420`. |
| `slider_width` | number | No | Ancho personalizado de la barra en pixeles, entre `8` y `44`. |
| `button_size` | number | No | Tamano personalizado de los botones en pixeles, entre `34` y `72`. |
| `show_name` | boolean | No | Muestra u oculta el nombre. Por defecto: `true`. |
| `show_position` | boolean | No | Muestra u oculta el porcentaje/estado. Por defecto: `true`. |
| `show_slider` | boolean | No | Muestra u oculta el slider. Por defecto: `true`. |
| `show_buttons` | boolean | No | Muestra u oculta los botones. Por defecto: `true`. |
| `button_background_color` | string | No | Color CSS para el fondo de todos los botones. |
| `open_button_background_color` | string | No | Color CSS para el boton de subir. |
| `stop_button_background_color` | string | No | Color CSS para el boton de parar. |
| `close_button_background_color` | string | No | Color CSS para el boton de bajar. |

## Ejemplo compacto

```yaml
type: custom:blind-control-card
entity: cover.shelly_2pm_gen4_persiana
name: Salon
size: small
icon: mdi:blinds
card_theme: minimal
slider_height: 160
slider_width: 22
button_size: 38
button_background_color: "rgba(120, 120, 120, 0.12)"
stop_button_background_color: "#b00020"
```

## Solo slider

```yaml
type: custom:blind-control-card
entity: cover.shelly_2pm_gen4_persiana
show_buttons: false
slider_width: 28
```

## Solo botones

```yaml
type: custom:blind-control-card
entity: cover.shelly_2pm_gen4_persiana
show_slider: false
button_size: 46
```

## Shelly 2PM Gen4

Para usar Shelly 2PM Gen4, configura el dispositivo en Home Assistant con perfil de cubierta/persiana para que exponga una entidad `cover`. La tarjeta usa los servicios estandar de `cover`, por lo que no llama a APIs propias de Shelly ni necesita credenciales adicionales.

## Temas

La tarjeta hereda las variables del tema activo de Home Assistant (`primary-color`, `ha-card-background`, `divider-color`, etc.).

Home Assistant permite definir temas en la integracion `frontend` y aplicarlos por usuario o por vista. Si aplicas un tema a una vista, Home Assistant lo aplica a la vista y sus tarjetas. Para personalizacion por tarjeta, `blind-control-card` incluye el campo `card_theme`, que ofrece presets internos sin cambiar el tema global.

## Notas

La barra de posicion lee `current_position`. Si la entidad no soporta `set_cover_position`, la tarjeta mantiene los botones disponibles y desactiva solo la barra.
