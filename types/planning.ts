import { Child } from "./enfant";

export type PlanningDay = {
    id:                 string;
    idChild:            string;
    date:               string;
    plannedStartTime:   string | null;
    plannedEndTime:     string | null;
    child:              Child;
}