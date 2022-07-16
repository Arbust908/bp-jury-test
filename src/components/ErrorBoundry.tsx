import React from "react";

type Props = {
  children: React.ReactNode,
}
type State = {
  hasError: boolean,
  message: string,
}

class ErrorBoundary extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" } as State;
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-4 py-2 m-4 text-slate-700 dark:text-slate-300">
          <p className="mt-2 font-bold text-lg mb-1">Error:</p>
          <p> {this.state.message} </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
