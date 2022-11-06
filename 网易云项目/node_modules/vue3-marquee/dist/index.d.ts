import { App } from 'vue';
import Vue3Marquee from './vue3-marquee.vue';
export { Vue3Marquee };
export declare function install(app: App, options: {
    name: string;
}): void;
declare const plugin: {
    version: string;
    install: typeof install;
};
export default plugin;
