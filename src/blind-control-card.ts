import { LitElement, css, html, nothing, type PropertyValues } from "lit";

interface BlindControlCardConfig {
  type: string;
  entity?: string;
  name?: string;
}

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    current_position?: number | string | null;
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

class BlindControlCard extends LitElement {
  public hass?: HomeAssistant;

  private _config?: BlindControlCardConfig;
  private _error?: string;
  private _dragPosition?: number;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _error: { state: true },
    _dragPosition: { state: true }
  };

  public setConfig(config: BlindControlCardConfig): void {
    if (!config.entity) {
      this._config = config;
      this._error = "Falta la opcion obligatoria \"entity\" en blind-control-card.";
      return;
    }

    this._config = config;
    this._error = undefined;
  }

  public getCardSize(): number {
    return 4;
  }

  public static getStubConfig(hass?: HomeAssistant): BlindControlCardConfig {
    const entity = Object.keys(hass?.states ?? {}).find((entityId) =>
      entityId.startsWith("cover.")
    );

    return {
      type: "custom:blind-control-card",
      entity: entity ?? "cover.persiana_salon",
      name: "Persiana"
    };
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("hass")) {
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
    const visiblePosition = this._dragPosition ?? position ?? 0;
    const hasPosition = position !== undefined || this._dragPosition !== undefined;
    const disabled = !this._supportsPosition(stateObj);

    return html`
      <ha-card>
        <div class="card-content">
          <h2 class="title">${name}</h2>

          <div class="slider-block">
            <div
              class=${`slider-shell${disabled ? " disabled" : ""}`}
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
                ?disabled=${disabled}
                aria-label=${`Posicion de ${name}`}
                @input=${this._handleSliderInput}
                @change=${this._handlePositionChange}
              />
            </div>
            <div class="position-label">
              ${hasPosition ? `${visiblePosition}%` : "Sin posicion"}
            </div>
          </div>

          ${disabled
            ? html`<div class="hint">
                Esta entidad no expone <code>current_position</code>.
              </div>`
            : nothing}

          <div class="actions">
            ${this._renderButton("Subir", "mdi:arrow-up", "open_cover")}
            ${this._renderButton("Parar", "mdi:stop", "stop_cover")}
            ${this._renderButton("Bajar", "mdi:arrow-down", "close_cover")}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderButton(
    label: string,
    icon: string,
    service: "open_cover" | "stop_cover" | "close_cover"
  ) {
    return html`
      <button type="button" @click=${() => this._callCoverService(service)}>
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
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
    this._dragPosition = Number(input.value);
  }

  private _handlePositionChange(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    const position = Number(input.value);
    this._dragPosition = position;
    void this._callCoverService("set_cover_position", { position });
  }

  private async _callCoverService(
    service: "open_cover" | "stop_cover" | "close_cover" | "set_cover_position",
    serviceData: Record<string, unknown> = {}
  ): Promise<void> {
    if (!this.hass || !this._config?.entity) {
      return;
    }

    await this.hass.callService("cover", service, {
      entity_id: this._config.entity,
      ...serviceData
    });
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

  private _supportsPosition(stateObj: HassEntity): boolean {
    return this._getCurrentPosition(stateObj) !== undefined;
  }

  private _clampPosition(position: number): number {
    return Math.min(100, Math.max(0, Math.round(position)));
  }

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: var(--ha-card-border-width, 0) solid
        var(--ha-card-border-color, var(--divider-color));
    }

    .card-content {
      padding: 18px 16px 16px;
      display: grid;
      gap: 16px;
      justify-items: center;
    }

    .title {
      margin: 0;
      width: 100%;
      text-align: center;
      font-size: 1.15rem;
      line-height: 1.3;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow-wrap: anywhere;
    }

    .slider-block {
      display: grid;
      justify-items: center;
      gap: 10px;
      width: 100%;
    }

    .slider-shell {
      --position: 0;
      position: relative;
      width: 88px;
      height: 220px;
      display: grid;
      place-items: center;
    }

    .slider-track {
      position: relative;
      width: 14px;
      height: 190px;
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
      width: 30px;
      height: 30px;
      border-radius: 50%;
      transform: translate(-50%, 50%);
      background: var(--primary-color);
      border: 3px solid var(--ha-card-background, var(--card-background-color));
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.24);
    }

    .position-slider {
      position: absolute;
      inset: 14px 0;
      width: 100%;
      height: calc(100% - 28px);
      margin: 0;
      opacity: 0;
      cursor: pointer;
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
      right: 2px;
      font-size: 0.75rem;
      line-height: 1;
      color: var(--secondary-text-color);
      pointer-events: none;
    }

    .scale.top {
      top: 8px;
    }

    .scale.bottom {
      bottom: 8px;
    }

    .position-label {
      min-height: 1.25rem;
      font-size: 0.95rem;
      color: var(--secondary-text-color);
    }

    .hint {
      margin-top: -8px;
      font-size: 0.85rem;
      line-height: 1.4;
      text-align: center;
      color: var(--secondary-text-color);
    }

    .hint code {
      font-family: var(--paper-font-code1_-_font-family, monospace);
      color: var(--primary-text-color);
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      width: 100%;
    }

    button {
      min-width: 0;
      min-height: 44px;
      padding: 8px 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: var(--secondary-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
      cursor: pointer;
      transition:
        background 120ms ease,
        border-color 120ms ease,
        color 120ms ease;
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

    ha-icon {
      --mdc-icon-size: 20px;
      color: var(--primary-color);
      flex: 0 0 auto;
    }

    button span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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

    @media (max-width: 360px) {
      .actions {
        grid-template-columns: 1fr;
      }

      button span {
        white-space: normal;
      }
    }
  `;
}

if (!customElements.get("blind-control-card")) {
  customElements.define("blind-control-card", BlindControlCard);
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards ?? [];

if (!window.customCards.some((card) => card.type === "blind-control-card")) {
  window.customCards.push({
    type: "blind-control-card",
    name: "Blind Control Card",
    description: "Control vertical para persianas y otras entidades cover.",
    preview: true
  });
}
