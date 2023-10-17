import { Component } from 'preact';
import { route } from 'preact-router';

export class RedirectToLogin extends Component {
  componentWillMount() {
    route('/login', true);
  }

  render() {
    return null;
  }
}