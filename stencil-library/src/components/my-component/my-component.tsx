import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string = 'John';

  /**
   * The user role
   */
  @Prop() authRole?: string = 'user'; // Optional role with default value

  /**
   * Formats the text with conditional handling of role
   */
  private getText(): string {
    // If `authRole` is null, undefined, or empty, fallback to a default message
    return this.authRole ? `${this.first} (${this.authRole})` : `${this.first}`; // If no role is provided, just show the name
  }

  /**
   * Renders the component
   */
  render() {
    const text = this.getText();

    // Render default text if name is empty (fallback handling if required)
    if (!text) {
      return <div class="my-component">Hello, World!</div>;
    }

    // Render the personalized message
    return <div class="my-component">Hello, World! I'm {text}</div>;
  }
}
