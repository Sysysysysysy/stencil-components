import { Component, getAssetPath, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'dropdown-component',
  styleUrl: 'dropdown-component.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class DropdownComponent {
  @Prop() options: [];
  @Prop() placeholder: string;

  @State() opened = false;
  @State() selected: string;

  private openDropdown() {
    this.opened = true;
  }

  private closeDropdown() {
    this.opened = false;
  }

  private clickOptionHandler(option: any) {
    this.closeDropdown();
    this.selected = option.label;
  }

  render() {
    let displayText = this.placeholder;
    if (this.selected) {
      displayText = this.selected;
    }

    let options = null;
    if (this.options) {
      options = (
        <div class={'options' + (this.opened ? ' opened' : '')}>
          {this.options.map((option: any) => (
            <span class={'option' + (option.label === this.selected ? ' active' : '')} key={option.key} onClick={() => this.clickOptionHandler(option)}>
              {option.label}
            </span>
          ))}
        </div>
      );
    }

    return [
      <div class={'backdrop' + (this.opened ? ' active' : '')} onClick={() => this.closeDropdown()}></div>,
      <div class="dropdown-container">
        <div class="label-container" onClick={() => this.openDropdown()}>
          <span class="label">{displayText}</span>
          <img class="arrow" src={getAssetPath(`./assets/sort-down.svg`)} height="16" width="16" />
        </div>
        {options}
      </div>,
    ];
  }
}
