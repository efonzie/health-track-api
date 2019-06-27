import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const params = {
        TableName: "configs",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        return success(result.Item);
    } catch (e) {
        return failure({ status: false });
    }
}
