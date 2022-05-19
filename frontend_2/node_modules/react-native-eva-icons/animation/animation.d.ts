import { Animated } from 'react-native';
export declare const DEFAULT_CONFIG: AnimationConfig;
/**
 * @property cycles - number of animation cycles. `Infinity` or `-1` for infinite
 */
export interface AnimationConfig extends Animated.AnimationConfig {
    cycles?: number;
}
/**
 * Base animation class. Creates `Animated.Value` and maps it to props of `Animated.View`
 */
export declare abstract class Animation<C extends AnimationConfig, R> {
    protected abstract animation: Animated.CompositeAnimation;
    protected counter: number;
    protected endCallback: Animated.EndCallback;
    protected running: boolean;
    protected config: C;
    abstract toProps(): R;
    constructor(config?: C);
    /**
     * Starts the animation
     * @param callback {Animated.EndCallback} - function to execute on animation end.
     */
    start(callback?: Animated.EndCallback): void;
    /**
     * Stops the animation
     */
    stop(): void;
    /**
     * @returns true if animation is currently running
     */
    isAnimating(): boolean;
    release(): void;
    /**
     * Default animation completion callback.
     * Will run animation again if it is not stopped or it should stop regarding to `cycles` property
     */
    protected onAnimationEnd: (result: Animated.EndResult) => void;
}
