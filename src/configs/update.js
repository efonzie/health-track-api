import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "configs",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId
        },
        UpdateExpression: "SET habits = :habits",
        ExpressionAttributeValues: {
            ":habits": data.habits || null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}