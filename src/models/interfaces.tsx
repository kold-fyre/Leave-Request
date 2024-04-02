export interface IRequest {
    employee: {
        id: number;
        name: string;
        age: number;
        gender: 'm' | 'f';
    }
    reason: string;
    leaveDate: string;
    returnDate: string;
    isApproved: boolean;
    isRejected: boolean;
}
