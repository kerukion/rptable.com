import { Component } from 'preact';
import { route } from 'preact-router';

export class RedirectTo extends Component<{to: string}> {
  componentWillMount() {
    route(this.props.to, true);
  }

  render() {
    return null;
  }
}