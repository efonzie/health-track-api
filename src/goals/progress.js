import { success, failure } from "../../libs/response-lib";
import { getCurrentNotes, getGoals, getNoteCount } from "./goalUtility";

// Return: A list of goals with an additional field for 'current' goal progress
//         EX: [{habit: "Yoga", measure:"Week", target:3, current:2}]
export async function main(event, context) {
    try {
        const userId = event.requestContext.identity.cognitoIdentityId;
        const notes = await getCurrentNotes(userId);
        const goals = await getGoals(userId);
        const goalProgress = goals.map(goal => {
            return { ...goal, current: getNoteCount(goal.measure, goal.habit, notes) }
        })
        return success(goalProgress);
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}