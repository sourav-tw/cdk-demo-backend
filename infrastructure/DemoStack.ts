import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct, Node } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';

export class DemoStack extends Stack {

    private api = new RestApi(this,'DemoAPI',{
        restApiName: 'DemoAPI'
    });
    private demoTable = new GenericTable('DemoTable', 'id', this);

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const helloLambda = new LambdaFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')),
            handler: 'hello.main',
            functionName: 'HelloLamda'
        });

        const helloLambdaIntegration = new LambdaIntegration(helloLambda);
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration);

    }
}