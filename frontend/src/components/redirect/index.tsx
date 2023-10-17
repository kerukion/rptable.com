import { Component } from 'preact';
import { AppRoutes, setRoute } from '~frontend/queries/routing';

export class RedirectTo extends Component<{ to: AppRoutes }> {
  componentWillMount(): void {
    setRoute(this.props.to);
  }

  render(): JSX.Element | null {
    return null;
  }
}