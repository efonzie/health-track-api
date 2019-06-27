import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "notes",
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET habit = :habit, eventDatetime = :eventDatetime, note = :note, attachment = :attachment",
        ExpressionAttributeValues: {
            ":habit": data.habit,
            ":eventDatetime": Date.parse(data.eventDatetime),
            ":note": data.note || null,
            ":attachment": data.attachment || null

        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}