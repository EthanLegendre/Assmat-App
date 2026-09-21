export type News = {
    id:             string;
    sessionId:      string;
    title:          string;
    description:    string | null;
    photoUrl:       string | null;
    audioUrl:       string | null;
    type:           string;
    createdAt:      string;
}