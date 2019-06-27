import { success, failure } from "../../libs/response-lib";
import * as dynamoDbLib from "../../libs/dynamodb-lib";

export async function main(event, context) {
    const params = {
        TableName: "goals",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            goalId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}