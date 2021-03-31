import React from 'react';
import { componentErrorConsts, errorMessages, width, height } from '../constants/Constants';
import { SDFallBackComponent } from '../views/errorHandleView/SDFallBackComponent';

export default class SDErrorBoundary extends React.PureComponent {

    state = {
        error: false
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidCatch(error, errorInfo) {
        // deal with errorInfo if needed
    }

    render() {

        if (this.state.error) {
            return <SDFallBackComponent width={width} height={height} descriptionText={errorMessages.ERROR_BOUNDARY}
                componentErrorConst={componentErrorConsts.ERROR_BOUNDARY} />;
        }
        return this.props.children;
    }
}
