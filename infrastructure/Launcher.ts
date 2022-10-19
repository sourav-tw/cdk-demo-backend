import { DemoStack } from './DemoStack';
import { App } from 'aws-cdk-lib';

const app = new App();
new DemoStack(app, 'DemoStack', {
    stackName: 'DemoStack'
});