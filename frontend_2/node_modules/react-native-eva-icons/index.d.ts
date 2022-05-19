import * as React from 'react';
import { Animated, ViewProps } from 'react-native';
import { SvgIconProps } from './svgIcon.component';
import { AnimationConfig, IconAnimationRegistry } from './animation';
export interface IconProps extends SvgIconProps {
    animation?: keyof IconAnimationRegistry;
    animationConfig?: AnimationConfig;
}
/**
 * @property name {string} - The name of icon. See the list of available icons https://akveo.github.io/eva-icons
 * @property animation {string} - The name of animation. Could be `zoom`, `pulse` or `shake`. Default is `zoom`
 * @property animationConfig {AnimationConfig} - Animation config including number of cycles to run. Extends Animated.AnimationConfig.
 *
 * @method startAnimation {void} - Starts the passed animation.
 * @method stopAnimation {void} - Stops the passed animation.
 * @method isAnimating {boolean} - Indicates if animation is currently running.
 */
export declare class Icon extends React.Component<IconProps> {
    static defaultProps: Partial<IconProps>;
    private readonly animation;
    constructor(props: IconProps);
    componentWillUnmount(): void;
    /**
     * Starts the animation
     * @param callback {Animated.EndCallback} - function to execute on animation end.
     */
    startAnimation: (callback?: Animated.EndCallback) => void;
    /**
     * Stops the animation
     */
    stopAnimation: () => void;
    /**
     * @returns true if animation is currently running
     */
    isAnimating: () => boolean;
    render(): React.ReactElement<ViewProps>;
}
