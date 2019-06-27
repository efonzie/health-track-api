import moment from 'moment';
import * as dynamoDbLib from "../../libs/dynamodb-lib";

// Return
export function getNoteCount(measure, habit, notes) {
    const filteredNotes = notes.filter((note) => {
        const rangeStart = new Date(moment().startOf(measure)).getTime();
        const rangeEnd = new Date(moment().endOf(measure)).getTime();
        return note.habit.toLowerCase() === habit.toLowerCase() && note.eventDatetime >= rangeStart && note.eventDatetime < rangeEnd;
    });
    return filteredNotes.length;
}

// Return: All notes within the current month for the current user
export async function getCurrentNotes(userId) {
    const params = {
        TableName: "notes",
        IndexName: "userId-eventDatetime-index",
        ProjectionExpression: "habit, eventDatetime",
        KeyConditionExpression: "userId = :userId AND eventDatetime BETWEEN :monthStart AND :monthEnd",
        ExpressionAttributeValues: {
            ":userId": userId,
            ":monthStart": moment().startOf('month').valueOf(),
            ":monthEnd": moment().endOf('month').valueOf()
        }
    };
    const result = await dynamoDbLib.call("query", params);
    return result.Items;
}

// Return: All goals for the current user
export async function getGoals(userId) {
    const params = {
        TableName: "goals",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId
        }
    };
    const result = await dynamoDbLib.call("query", params);
    return result.Items;
}