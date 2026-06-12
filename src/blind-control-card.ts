import { LitElement, css, html, nothing, type PropertyValues } from "lit";

type BlindControlCardSize = "small" | "medium" | "large";
type BlindControlCardTheme = "default" | "minimal" | "filled" | "outline";
type CoverService =
  | "open_cover"
  | "stop_cover"
  | "close_cover"
  | "set_cover_position";

interface BlindControlCardConfig {
  type?: string;
  entity?: string;
  name?: string;
  icon?: string;
  size?: BlindControlCardSize;
  card_theme?: BlindControlCardTheme;
  slider_height?: number;
  slider_width?: number;
  slider_touch_width?: number;
  button_size?: number;
  show_name?: boolean;
  show_position?: boolean;
  show_slider?: boolean;
  show_buttons?: boolean;
  button_background_color?: string;
  open_button_background_color?: string;
  stop_button_background_color?: string;
  close_button_background_color?: string;
}

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    current_position?: number | string | null;
    supported_features?: number | string;
    [key: string]: unknown;
  };
}

interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>
  ): Promise<unknown>;
}

interface SizePreset {
  sliderHeight: number;
  sliderWidth: number;
  sliderTouchWidth: number;
  buttonSize: number;
  iconSize: number;
  padding: number;
  gap: number;
  cardSize: number;
}

interface EntitySuggestion {
  label?: string;
  config: BlindControlCardConfig;
}

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
  getEntitySuggestion?: (
    hass: HomeAssistant,
    entityId: string
  ) => EntitySuggestion | EntitySuggestion[] | null;
}

const COVER_FEATURE_OPEN = 1;
const COVER_FEATURE_CLOSE = 2;
const COVER_FEATURE_SET_POSITION = 4;
const COVER_FEATURE_STOP = 8;

const DEFAULT_SIZE: BlindControlCardSize = "medium";
const DEFAULT_CARD_THEME: BlindControlCardTheme = "default";
const DEFAULT_SHOW_NAME = true;
const DEFAULT_SHOW_POSITION = true;
const DEFAULT_SHOW_SLIDER = true;
const DEFAULT_SHOW_BUTTONS = true;

const SIZE_PRESETS: Record<BlindControlCardSize, SizePreset> = {
  small: {
    sliderHeight: 150,
    sliderWidth: 14,
    sliderTouchWidth: 44,
    buttonSize: 38,
    iconSize: 20,
    padding: 12,
    gap: 10,
    cardSize: 3
  },
  medium: {
    sliderHeight: 210,
    sliderWidth: 14,
    sliderTouchWidth: 44,
    buttonSize: 44,
    iconSize: 22,
    padding: 16,
    gap: 14,
    cardSize: 4
  },
  large: {
    sliderHeight: 280,
    sliderWidth: 16,
    sliderTouchWidth: 48,
    buttonSize: 54,
    iconSize: 26,
    padding: 20,
    gap: 18,
    cardSize: 5
  }
};

const EDITOR_LABELS: Record<string, string> = {
  entity: "Entidad cover",
  name: "Nombre",
  icon: "Icono junto al nombre",
  size: "Tamano",
  card_theme: "Tema de tarjeta",
  slider_height: "Altura de barra",
  slider_width: "Ancho de barra",
  slider_touch_width: "Zona tactil del slider",
  button_size: "Tamano de botones",
  show_name: "Mostrar nombre",
  show_position: "Mostrar porcentaje",
  show_slider: "Mostrar slider",
  show_buttons: "Mostrar botones",
  button_background_color: "Fondo de todos los botones",
  open_button_background_color: "Fondo boton subir",
  stop_button_background_color: "Fondo boton parar",
  close_button_background_color: "Fondo boton bajar"
};

const EDITOR_SCHEMA = [
  {
    name: "entity",
    required: true,
    selector: {
      entity: {
        domain: "cover"
      }
    }
  },
  {
    name: "name",
    selector: {
      text: {}
    }
  },
  {
    name: "icon",
    selector: {
      icon: {}
    }
  },
  {
    name: "size",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "small", label: "Pequena" },
          { value: "medium", label: "Media" },
          { value: "large", label: "Grande" }
        ]
      }
    }
  },
  {
    name: "card_theme",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "default", label: "Home Assistant" },
          { value: "minimal", label: "Minimal" },
          { value: "filled", label: "Relleno" },
          { value: "outline", label: "Borde" }
        ]
      }
    }
  },
  {
    name: "show_slider",
    selector: {
      boolean: {}
    }
  },
  {
    name: "show_buttons",
    selector: {
      boolean: {}
    }
  },
  {
    name: "slider_height",
    selector: {
      number: {
        min: 120,
        max: 420,
        step: 10,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "slider_width",
    selector: {
      number: {
        min: 8,
        max: 44,
        step: 1,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "slider_touch_width",
    selector: {
      number: {
        min: 28,
        max: 96,
        step: 2,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "button_size",
    selector: {
      number: {
        min: 34,
        max: 72,
        step: 2,
        mode: "slider",
        unit_of_measurement: "px"
      }
    }
  },
  {
    name: "show_name",
    selector: {
      boolean: {}
    }
  },
  {
    name: "show_position",
    selector: {
      boolean: {}
    }
  },
  {
    name: "button_background_color",
    selector: {
      text: {}
    }
  },
  {
    name: "open_button_background_color",
    selector: {
      text: {}
    }
  },
  {
    name: "stop_button_background_color",
    selector: {
      text: {}
    }
  },
  {
    name: "close_button_background_color",
    selector: {
      text: {}
    }
  }
];

class BlindControlCard extends LitElement {
  public hass?: HomeAssistant;

  private _config?: BlindControlCardConfig;
  private _error?: string;
  private _dragPosition?: number;
  private _isSliding = false;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _error: { state: true },
    _dragPosition: { state: true }
  };

  public setConfig(config: BlindControlCardConfig): void {
    const normalizedConfig = normalizeConfig(config);

    if (!normalizedConfig.entity) {
      this._config = normalizedConfig;
      this._error = "Falta la opcion obligatoria \"entity\" en blind-control-card.";
      return;
    }

    this._config = normalizedConfig;
    this._error = undefined;
  }

  public getCardSize(): number {
    const settings = this._getSizeSettings();
    const showName = this._config?.show_name ?? DEFAULT_SHOW_NAME;
    const showPosition = this._config?.show_position ?? DEFAULT_SHOW_POSITION;
    const showSlider = this._config?.show_slider ?? DEFAULT_SHOW_SLIDER;
    const showButtons = this._config?.show_buttons ?? DEFAULT_SHOW_BUTTONS;
    const sections = [
      showName ? 30 : 0,
      showSlider ? settings.sliderHeight + (showPosition ? 22 : 0) : 0,
      showButtons ? settings.buttonSize : 0
    ].filter((height) => height > 0);
    const estimatedHeight =
      settings.padding * 2 +
      sections.reduce((total, height) => total + height, 0) +
      Math.max(0, sections.length - 1) * settings.gap;

    return Math.max(2, Math.ceil(estimatedHeight / 50));
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement("blind-control-card-editor");
  }

  public static getStubConfig(hass?: HomeAssistant): BlindControlCardConfig {
    const entity = Object.keys(hass?.states ?? {}).find((entityId) =>
      entityId.startsWith("cover.")
    );

    return {
      entity: entity ?? "cover.persiana_salon",
      size: DEFAULT_SIZE
    };
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("hass") && !this._isSliding) {
      this._dragPosition = undefined;
    }
  }

  public render() {
    if (this._error) {
      return this._renderError(this._error);
    }

    if (!this._config?.entity) {
      return this._renderError("Configura una entidad cover para usar esta tarjeta.");
    }

    if (!this.hass) {
      return html`
        <ha-card>
          <div class="card-content muted">Cargando Home Assistant...</div>
        </ha-card>
      `;
    }

    if (!this._config.entity.startsWith("cover.")) {
      return this._renderError(`La entidad "${this._config.entity}" no es de tipo cover.`);
    }

    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return this._renderError(`No existe la entidad "${this._config.entity}".`);
    }

    const name =
      this._config.name ??
      stateObj.attributes.friendly_name ??
      this._config.entity;
    const position = this._getCurrentPosition(stateObj);
    const visiblePosition = this._dragPosition ?? position ?? this._positionFromState(stateObj);
    const hasPosition = position !== undefined || this._dragPosition !== undefined;
    const unavailable = this._isUnavailable(stateObj);
    const supportsPosition = this._supportsFeature(
      stateObj,
      COVER_FEATURE_SET_POSITION,
      position !== undefined
    );
    const showName = this._config.show_name ?? DEFAULT_SHOW_NAME;
    const showPosition = this._config.show_position ?? DEFAULT_SHOW_POSITION;
    const showSlider = this._config.show_slider ?? DEFAULT_SHOW_SLIDER;
    const showButtons = this._config.show_buttons ?? DEFAULT_SHOW_BUTTONS;
    const cardTheme = this._config.card_theme ?? DEFAULT_CARD_THEME;
    const settings = this._getSizeSettings();
    const cardStyle = this._getCardStyle(settings);

    if (!showSlider && !showButtons) {
      return this._renderError("Activa show_slider o show_buttons para mostrar controles.");
    }

    return html`
      <ha-card class=${`theme-${cardTheme}`} style=${cardStyle}>
        <div class="card-content">
          ${showName ? this._renderTitle(name) : nothing}

          ${showSlider
            ? html`
                <div class="slider-block">
                  <div
                    class=${`slider-shell${
                      supportsPosition && !unavailable ? "" : " disabled"
                    }`}
                    style=${`--position: ${visiblePosition};`}
                  >
                    <span class="scale top">100</span>
                    <div class="slider-track" aria-hidden="true">
                      <div class="slider-fill"></div>
                      <div class="slider-thumb"></div>
                    </div>
                    <span class="scale bottom">0</span>
                    <input
                      class="position-slider"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      .value=${String(visiblePosition)}
                      ?disabled=${!supportsPosition || unavailable}
                      aria-label=${`Posicion de ${name}`}
                      @input=${this._handleSliderInput}
                      @change=${this._handlePositionChange}
                    />
                  </div>

                  ${showPosition
                    ? html`
                        <div class="position-label">
                          ${hasPosition
                            ? `${visiblePosition}%`
                            : this._getStateLabel(stateObj)}
                        </div>
                      `
                    : nothing}
                </div>
              `
            : nothing}

          ${showSlider && !supportsPosition && !unavailable
            ? html`<div class="hint">
                Esta entidad no permite fijar posicion desde Home Assistant.
              </div>`
            : nothing}

          ${showSlider && unavailable
            ? html`<div class="hint">La entidad esta ${stateObj.state}.</div>`
            : nothing}

          ${showButtons
            ? html`
                <div class="actions">
                  ${this._renderButton(
                    "Subir",
                    "mdi:arrow-up-bold",
                    "open_cover",
                    unavailable || !this._supportsFeature(stateObj, COVER_FEATURE_OPEN, true),
                    this._getButtonBackground("open")
                  )}
                  ${this._renderButton(
                    "Parar",
                    "mdi:stop",
                    "stop_cover",
                    unavailable || !this._supportsFeature(stateObj, COVER_FEATURE_STOP, true),
                    this._getButtonBackground("stop")
                  )}
                  ${this._renderButton(
                    "Bajar",
                    "mdi:arrow-down-bold",
                    "close_cover",
                    unavailable || !this._supportsFeature(stateObj, COVER_FEATURE_CLOSE, true),
                    this._getButtonBackground("close")
                  )}
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderTitle(name: string) {
    const icon = this._getIcon();

    return html`
      <div class="title-row">
        ${icon ? html`<ha-icon class="title-icon" .icon=${icon}></ha-icon>` : nothing}
        <h2 class="title">${name}</h2>
        ${icon ? html`<ha-icon class="title-icon" .icon=${icon}></ha-icon>` : nothing}
      </div>
    `;
  }

  private _renderButton(
    label: string,
    icon: string,
    service: Exclude<CoverService, "set_cover_position">,
    disabled: boolean,
    backgroundColor?: string
  ) {
    return html`
      <button
        type="button"
        title=${label}
        aria-label=${label}
        style=${backgroundColor ? `--blind-button-bg: ${backgroundColor};` : ""}
        ?disabled=${disabled}
        @click=${() => this._callCoverService(service)}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _renderError(message: string) {
    return html`
      <ha-card>
        <div class="card-content error" role="alert">
          <strong>Blind Control Card</strong>
          <span>${message}</span>
        </div>
      </ha-card>
    `;
  }

  private _handleSliderInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    this._isSliding = true;
    this._dragPosition = Number(input.value);
  }

  private _handlePositionChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const position = Number(input.value);
    this._isSliding = false;
    this._dragPosition = position;
    void this._callCoverService("set_cover_position", { position });
  }

  private async _callCoverService(
    service: CoverService,
    serviceData: Record<string, unknown> = {}
  ): Promise<void> {
    if (!this.hass || !this._config?.entity) {
      return;
    }

    try {
      await this.hass.callService("cover", service, {
        entity_id: this._config.entity,
        ...serviceData
      });
    } catch (error) {
      console.error("blind-control-card service call failed", error);
    }
  }

  private _getCurrentPosition(stateObj: HassEntity): number | undefined {
    const position = stateObj.attributes.current_position;

    if (typeof position === "number" && Number.isFinite(position)) {
      return this._clampPosition(position);
    }

    if (typeof position === "string" && position.trim() !== "") {
      const parsed = Number(position);
      return Number.isFinite(parsed) ? this._clampPosition(parsed) : undefined;
    }

    return undefined;
  }

  private _positionFromState(stateObj: HassEntity): number {
    if (stateObj.state === "open") {
      return 100;
    }

    if (stateObj.state === "closed") {
      return 0;
    }

    return 50;
  }

  private _getStateLabel(stateObj: HassEntity): string {
    if (stateObj.state === "unknown" || stateObj.state === "unavailable") {
      return stateObj.state;
    }

    return "Sin posicion";
  }

  private _supportsFeature(
    stateObj: HassEntity,
    feature: number,
    fallback: boolean
  ): boolean {
    const rawFeatures = stateObj.attributes.supported_features;
    const supportedFeatures =
      typeof rawFeatures === "number" ? rawFeatures : Number(rawFeatures);

    if (!Number.isFinite(supportedFeatures)) {
      return fallback;
    }

    return (supportedFeatures & feature) !== 0;
  }

  private _isUnavailable(stateObj: HassEntity): boolean {
    return stateObj.state === "unavailable" || stateObj.state === "unknown";
  }

  private _getIcon(): string | undefined {
    const icon = this._config?.icon?.trim();
    return icon || undefined;
  }

  private _getButtonBackground(type: "open" | "stop" | "close"): string | undefined {
    const specificColor =
      type === "open"
        ? this._config?.open_button_background_color
        : type === "stop"
          ? this._config?.stop_button_background_color
          : this._config?.close_button_background_color;

    return cleanCssColor(specificColor) ?? cleanCssColor(this._config?.button_background_color);
  }

  private _getSizeSettings(): SizePreset {
    const size = this._config?.size ?? DEFAULT_SIZE;
    const preset = SIZE_PRESETS[size] ?? SIZE_PRESETS[DEFAULT_SIZE];

    return {
      ...preset,
      sliderHeight: clampNumber(
        this._config?.slider_height,
        120,
        420,
        preset.sliderHeight
      ),
      sliderWidth: clampNumber(
        this._config?.slider_width,
        8,
        44,
        preset.sliderWidth
      ),
      sliderTouchWidth: clampNumber(
        this._config?.slider_touch_width,
        28,
        96,
        preset.sliderTouchWidth
      ),
      buttonSize: clampNumber(
        this._config?.button_size,
        34,
        72,
        preset.buttonSize
      )
    };
  }

  private _getCardStyle(settings: SizePreset): string {
    return [
      `--blind-slider-height: ${settings.sliderHeight}px`,
      `--blind-slider-width: ${settings.sliderWidth}px`,
      `--blind-slider-touch-width: ${settings.sliderTouchWidth}px`,
      `--blind-thumb-size: ${Math.max(30, settings.sliderWidth + 16)}px`,
      `--blind-button-size: ${settings.buttonSize}px`,
      `--blind-icon-size: ${settings.iconSize}px`,
      `--blind-card-padding: ${settings.padding}px`,
      `--blind-card-gap: ${settings.gap}px`
    ].join(";");
  }

  private _clampPosition(position: number): number {
    return Math.min(100, Math.max(0, Math.round(position)));
  }

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
      container-type: inline-size;
    }

    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: var(--ha-card-border-width, 0) solid
        var(--ha-card-border-color, var(--divider-color));
      overflow: hidden;
    }

    ha-card.theme-minimal {
      background: transparent;
      border-color: transparent;
      box-shadow: none;
    }

    ha-card.theme-filled {
      background: color-mix(
        in srgb,
        var(--primary-color),
        var(--ha-card-background, var(--card-background-color)) 88%
      );
    }

    ha-card.theme-outline {
      background: transparent;
      border-width: max(1px, var(--ha-card-border-width, 1px));
      border-color: color-mix(in srgb, var(--primary-color), var(--divider-color) 55%);
      box-shadow: none;
    }

    .card-content {
      width: 100%;
      box-sizing: border-box;
      padding: var(--blind-card-padding, 16px);
      display: grid;
      gap: var(--blind-card-gap, 14px);
      justify-items: center;
    }

    .title-row {
      width: 100%;
      display: grid;
      grid-template-columns: auto minmax(0, auto) auto;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-align: center;
    }

    .title {
      margin: 0;
      width: 100%;
      text-align: center;
      font-size: 1.05rem;
      line-height: 1.25;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow-wrap: anywhere;
    }

    .title-icon {
      --mdc-icon-size: calc(var(--blind-icon-size, 22px) * 0.95);
      color: var(--primary-color);
    }

    .slider-block {
      display: grid;
      justify-items: center;
      gap: 8px;
      width: 100%;
    }

    .slider-shell {
      --position: 0;
      position: relative;
      width: min(96px, 100%);
      height: var(--blind-slider-height, 210px);
      display: grid;
      place-items: center;
    }

    .slider-track {
      position: relative;
      width: var(--blind-slider-width, 14px);
      height: calc(var(--blind-slider-height, 210px) - 30px);
      min-height: 86px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--divider-color);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color), transparent 88%);
    }

    .slider-fill {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: calc(var(--position) * 1%);
      background: var(--primary-color);
    }

    .slider-thumb {
      position: absolute;
      left: 50%;
      bottom: calc(var(--position) * 1%);
      width: var(--blind-thumb-size, 30px);
      height: var(--blind-thumb-size, 30px);
      border-radius: 50%;
      transform: translate(-50%, 50%);
      background: var(--primary-color);
      border: 3px solid var(--ha-card-background, var(--card-background-color));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.24);
    }

    .position-slider {
      position: absolute;
      top: 14px;
      bottom: 14px;
      left: 50%;
      width: var(--blind-slider-touch-width, 44px);
      height: calc(100% - 28px);
      margin: 0;
      opacity: 0;
      cursor: pointer;
      transform: translateX(-50%);
      touch-action: none;
      writing-mode: vertical-lr;
      direction: rtl;
    }

    .position-slider:disabled {
      cursor: not-allowed;
    }

    .slider-shell.disabled {
      opacity: 0.55;
    }

    .slider-shell:focus-within .slider-thumb {
      box-shadow:
        0 0 0 4px color-mix(in srgb, var(--primary-color), transparent 72%),
        0 2px 8px rgba(0, 0, 0, 0.24);
    }

    .scale {
      position: absolute;
      right: 0;
      font-size: 0.72rem;
      line-height: 1;
      color: var(--secondary-text-color);
      pointer-events: none;
    }

    .scale.top {
      top: 6px;
    }

    .scale.bottom {
      bottom: 6px;
    }

    .position-label {
      min-height: 1.1rem;
      font-size: 0.9rem;
      line-height: 1.1;
      color: var(--secondary-text-color);
    }

    .hint {
      margin-top: calc(var(--blind-card-gap, 14px) * -0.5);
      max-width: 100%;
      font-size: 0.82rem;
      line-height: 1.35;
      text-align: center;
      color: var(--secondary-text-color);
      overflow-wrap: anywhere;
    }

    .actions {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, var(--blind-button-size, 44px)));
      justify-content: center;
      gap: max(6px, calc(var(--blind-button-size, 44px) * 0.18));
    }

    button {
      width: 100%;
      height: var(--blind-button-size, 44px);
      min-width: 0;
      min-height: 34px;
      padding: 0;
      display: inline-grid;
      place-items: center;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--blind-button-bg, var(--secondary-background-color, transparent));
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
      transition:
        background 120ms ease,
        border-color 120ms ease,
        color 120ms ease,
        opacity 120ms ease;
    }

    button:hover,
    button:focus-visible {
      background: color-mix(in srgb, var(--primary-color), transparent 88%);
      border-color: var(--primary-color);
      outline: none;
    }

    button:active {
      background: color-mix(in srgb, var(--primary-color), transparent 78%);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }

    ha-icon {
      --mdc-icon-size: var(--blind-icon-size, 22px);
      color: var(--primary-color);
    }

    .muted {
      color: var(--secondary-text-color);
      text-align: center;
    }

    .error {
      justify-items: start;
      gap: 6px;
      color: var(--error-color, #db4437);
    }

    .error strong {
      color: var(--primary-text-color);
    }

    @container (max-width: 170px) {
      .card-content {
        padding-inline: 8px;
      }

      .actions {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 5px;
      }

      .scale {
        right: 2px;
      }
    }
  `;
}

class BlindControlCardEditor extends LitElement {
  public hass?: HomeAssistant;

  private _config?: BlindControlCardConfig;

  static properties = {
    hass: { attribute: false },
    _config: { state: true }
  };

  public setConfig(config: BlindControlCardConfig): void {
    this._config = normalizeConfig(config);
  }

  public render() {
    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._getEditorData()}
          .schema=${EDITOR_SCHEMA}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._handleValueChanged}
        ></ha-form>
      </div>
    `;
  }

  private _getEditorData(): BlindControlCardConfig {
    return {
      type: "custom:blind-control-card",
      size: DEFAULT_SIZE,
      card_theme: DEFAULT_CARD_THEME,
      show_name: DEFAULT_SHOW_NAME,
      show_position: DEFAULT_SHOW_POSITION,
      show_slider: DEFAULT_SHOW_SLIDER,
      show_buttons: DEFAULT_SHOW_BUTTONS,
      ...this._config
    };
  }

  private _computeLabel = (schema: { name: string }): string =>
    EDITOR_LABELS[schema.name] ?? schema.name;

  private _handleValueChanged(event: CustomEvent): void {
    const value = event.detail.value as BlindControlCardConfig;
    const config = cleanConfig({
      ...this._config,
      ...value,
      type: "custom:blind-control-card"
    });

    this._config = normalizeConfig(config);
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true
      })
    );
  }

  static styles = css`
    .editor {
      display: block;
    }
  `;
}

function normalizeConfig(config: BlindControlCardConfig): BlindControlCardConfig {
  const size = isCardSize(config.size) ? config.size : DEFAULT_SIZE;
  const cardTheme = isCardTheme(config.card_theme)
    ? config.card_theme
    : DEFAULT_CARD_THEME;

  return {
    ...config,
    type: config.type || "custom:blind-control-card",
    size,
    card_theme: cardTheme,
    show_name: config.show_name ?? DEFAULT_SHOW_NAME,
    show_position: config.show_position ?? DEFAULT_SHOW_POSITION,
    show_slider: config.show_slider ?? DEFAULT_SHOW_SLIDER,
    show_buttons: config.show_buttons ?? DEFAULT_SHOW_BUTTONS
  };
}

function cleanConfig(config: BlindControlCardConfig): BlindControlCardConfig {
  const next: BlindControlCardConfig = {
    ...config,
    type: "custom:blind-control-card"
  };

  if (typeof next.name === "string") {
    next.name = next.name.trim();
  }

  if (typeof next.icon === "string") {
    next.icon = next.icon.trim();
  }

  if (!next.name) {
    delete next.name;
  }

  if (!next.icon) {
    delete next.icon;
  }

  if (!next.entity) {
    delete next.entity;
  }

  if (!isCardSize(next.size) || next.size === DEFAULT_SIZE) {
    delete next.size;
  }

  if (!isCardTheme(next.card_theme) || next.card_theme === DEFAULT_CARD_THEME) {
    delete next.card_theme;
  }

  if (next.show_name === DEFAULT_SHOW_NAME) {
    delete next.show_name;
  }

  if (next.show_position === DEFAULT_SHOW_POSITION) {
    delete next.show_position;
  }

  if (next.show_slider === DEFAULT_SHOW_SLIDER) {
    delete next.show_slider;
  }

  if (next.show_buttons === DEFAULT_SHOW_BUTTONS) {
    delete next.show_buttons;
  }

  const sliderHeight = cleanNumber(next.slider_height, 120, 420);
  const sliderWidth = cleanNumber(next.slider_width, 8, 44);
  const sliderTouchWidth = cleanNumber(next.slider_touch_width, 28, 96);
  const buttonSize = cleanNumber(next.button_size, 34, 72);

  if (sliderHeight === undefined) {
    delete next.slider_height;
  } else {
    next.slider_height = sliderHeight;
  }

  if (sliderWidth === undefined) {
    delete next.slider_width;
  } else {
    next.slider_width = sliderWidth;
  }

  if (sliderTouchWidth === undefined) {
    delete next.slider_touch_width;
  } else {
    next.slider_touch_width = sliderTouchWidth;
  }

  if (buttonSize === undefined) {
    delete next.button_size;
  } else {
    next.button_size = buttonSize;
  }

  next.button_background_color = cleanCssColor(next.button_background_color);
  next.open_button_background_color = cleanCssColor(next.open_button_background_color);
  next.stop_button_background_color = cleanCssColor(next.stop_button_background_color);
  next.close_button_background_color = cleanCssColor(next.close_button_background_color);

  if (!next.button_background_color) {
    delete next.button_background_color;
  }

  if (!next.open_button_background_color) {
    delete next.open_button_background_color;
  }

  if (!next.stop_button_background_color) {
    delete next.stop_button_background_color;
  }

  if (!next.close_button_background_color) {
    delete next.close_button_background_color;
  }

  return next;
}

function isCardSize(size: unknown): size is BlindControlCardSize {
  return size === "small" || size === "medium" || size === "large";
}

function isCardTheme(theme: unknown): theme is BlindControlCardTheme {
  return (
    theme === "default" ||
    theme === "minimal" ||
    theme === "filled" ||
    theme === "outline"
  );
}

function cleanNumber(value: unknown, min: number, max: number): number | undefined {
  const numberValue = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(numberValue)) {
    return undefined;
  }

  return Math.min(max, Math.max(min, Math.round(numberValue)));
}

function clampNumber(
  value: unknown,
  min: number,
  max: number,
  fallback: number
): number {
  return cleanNumber(value, min, max) ?? fallback;
}

function cleanCssColor(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const color = value.trim();

  if (!color || /[;{}]/.test(color)) {
    return undefined;
  }

  return color;
}

function getBlindControlEntitySuggestion(
  hass: HomeAssistant,
  entityId: string
): EntitySuggestion[] | null {
  if (entityId.split(".")[0] !== "cover") {
    return null;
  }

  const stateObj = hass.states[entityId];
  const suggestions: EntitySuggestion[] = [
    {
      label: "Completa",
      config: {
        type: "custom:blind-control-card",
        entity: entityId,
        icon: "mdi:blinds"
      }
    }
  ];

  if (stateObj ? entitySupportsPosition(stateObj) : true) {
    suggestions.push({
      label: "Solo slider",
      config: {
        type: "custom:blind-control-card",
        entity: entityId,
        icon: "mdi:blinds",
        show_buttons: false
      }
    });
  }

  suggestions.push({
    label: "Solo botones",
    config: {
      type: "custom:blind-control-card",
      entity: entityId,
      icon: "mdi:blinds",
      show_slider: false
    }
  });

  return suggestions;
}

function entitySupportsPosition(stateObj: HassEntity): boolean {
  const rawFeatures = stateObj.attributes.supported_features;
  const supportedFeatures =
    typeof rawFeatures === "number" ? rawFeatures : Number(rawFeatures);

  if (Number.isFinite(supportedFeatures)) {
    return (supportedFeatures & COVER_FEATURE_SET_POSITION) !== 0;
  }

  return stateObj.attributes.current_position !== undefined;
}

if (!customElements.get("blind-control-card")) {
  customElements.define("blind-control-card", BlindControlCard);
}

if (!customElements.get("blind-control-card-editor")) {
  customElements.define("blind-control-card-editor", BlindControlCardEditor);
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
    __BLIND_CONTROL_CARD_VERSION__?: string;
  }
}

window.customCards = window.customCards ?? [];

const blindControlCardEntry: CustomCardEntry = {
  type: "blind-control-card",
  name: "Blind Control Card",
  description: "Control responsive para persianas y covers Shelly.",
  preview: true,
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/#suggesting-your-card-for-an-entity",
  getEntitySuggestion: getBlindControlEntitySuggestion
};

const registeredCard = window.customCards.find(
  (card) => card.type === blindControlCardEntry.type
);

if (registeredCard) {
  Object.assign(registeredCard, blindControlCardEntry);
} else {
  window.customCards.push(blindControlCardEntry);
}

if (!window.__BLIND_CONTROL_CARD_VERSION__) {
  console.info(
    "%cBLIND-CONTROL-CARD%c 0.5.0 loaded",
    "color: var(--primary-color); font-weight: 700;",
    "color: inherit;"
  );
  window.__BLIND_CONTROL_CARD_VERSION__ = "0.5.0";
}
