export interface Quiz {
    readonly id: string;
    kind: "Quiz";
    title: string;
    correctAnswers: number;
    totalQuestions: number;
}

export interface LabAssignment {
    readonly id: string;
    kind: "Lab";
    title: string;
    functionalityScore: number;
    codeQualityScore: number;
}

export type AssessmentItem = Quiz | LabAssignment;

export function calculateGrade(item: AssessmentItem): number {
    switch (item.kind) {
        case "Quiz":
            return Math.round(
                (item.correctAnswers / item.totalQuestions) * 100
            );

        case "Lab":
            return Math.round(
                item.functionalityScore * 0.7 +
                item.codeQualityScore * 0.3
            );

        default: {
            const _check: never = item;
            return _check;
        }
    }
}