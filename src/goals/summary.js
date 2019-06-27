import { success, failure } from "../../libs/response-lib";
import { getCurrentNotes, getGoals, getNoteCount } from "./goalUtility";

export async function main(event, context) {
    try {
        const userId = event.requestContext.identity.cognitoIdentityId;
        const notes = await getCurrentNotes(userId);
        const goals = await getGoals(userId);
        return success(getGoalSummary(goals, notes));
    } catch (e) {
        console.log(e);
        return failure({ status: false });
    }
}

function getGoalSummary(goals, notes) {
    // Get unique list of measures from list of goals
    let uniqueGoalMeasures = goals.map(goal => goal.measure.toLowerCase()).filter((measure, i, arr) => arr.indexOf(measure) === i);

    // Sort the unique measures by filtering on a pre-sorted array
    uniqueGoalMeasures = ["day","week","month"].filter(measure => uniqueGoalMeasures.indexOf(measure) >=0);

    // Generate summary object by summing current counts and target counts for goals within each measure
    const goalProgressSummary = uniqueGoalMeasures.map(measure => {
        const filteredGoals = goals.filter(goal => goal.measure.toLowerCase() === measure.toLowerCase());
        const current = filteredGoals.reduce((acc, goal) => acc + getNoteCount(measure, goal.habit, notes), 0);
        const target = filteredGoals.reduce((acc, goal) => acc + parseInt(goal.target), 0);
        return { measure, current, target };
    })
    return goalProgressSummary;
}