import { Component } from 'preact';
import { route } from 'preact-router';

export class RedirectTo extends Component<{to: string}> {
  componentWillMount(): void {
    route(this.props.to, true);
  }

  render(): JSX.Element | null {
    return null;
  }
}