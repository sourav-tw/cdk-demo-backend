import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct, Node } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';

export class DemoStack extends Stack {

    private lambdaApi = new RestApi(this,'DemoLambdaAPI',{
        restApiName:'DemoLambdaAPI'
    });

    private demoTable = new GenericTable('DemoTable', 'id', this);

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const helloLambdaNodeJS = new NodejsFunction(this, 'helloLambdaNodeJS',{
            entry: (join(__dirname,'..','services','node-lambda','hello.ts')),
            handler: 'handler',
            functionName: 'helloLambdaNodeJS'
        });


        const s3ListPolicy = new PolicyStatement();
        s3ListPolicy.addActions('s3:ListAllMyBuckets');
        s3ListPolicy.addResources('*');
        helloLambdaNodeJS.addToRolePolicy(s3ListPolicy);

        const helloLambdaNodeJSIntegration = new LambdaIntegration(helloLambdaNodeJS);
        const helloLambdaNodeJSResource = this.lambdaApi.root.addResource('hello-lambda');
        helloLambdaNodeJSResource.addMethod('GET',helloLambdaNodeJSIntegration);

    }
}