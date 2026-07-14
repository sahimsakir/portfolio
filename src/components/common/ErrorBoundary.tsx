import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Portfolio crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
          <p className="kbd-eyebrow mb-4">error 500</p>
          <h1 className="section-heading mb-3">Something broke on this page.</h1>
          <p className="mb-8 max-w-md text-ink-dim">
            An unexpected error occurred while rendering this section. Refreshing the page usually fixes it.
          </p>
          <button onClick={() => window.location.reload()} className="btn-gradient">
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
