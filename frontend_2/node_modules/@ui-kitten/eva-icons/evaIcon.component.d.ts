import React from 'react';
import { SvgProps } from 'react-native-svg';
import { IconProvider } from '@ui-kitten/components';
declare type IconElement = React.ReactElement<SvgProps>;
declare type IconComponent = React.ComponentType<SvgProps>;
export declare class EvaIcon implements IconProvider<SvgProps> {
    private content;
    constructor(content: IconComponent);
    toReactElement(props: SvgProps): IconElement;
}
export {};
