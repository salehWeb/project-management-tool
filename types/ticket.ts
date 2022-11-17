export interface ITicket {
    title: string
}

export type ITicketTypes = "FEATURE" | "BUG";

export type ITicketPriority = "LOW" | "MEDIUM" | "HIGH";

export type ITicketStatus = "NEW" | "IN_PROGRESS" | "RESOLVED" | "REVIEWING" | "CLOSED";

export type IRate = "card1" | "card2" | "card3" | "card4" | "card5" | "card6" | "card7" | "card8" | "card9" | "card10";


export interface ITag {
    name: string;
    color: string;
    isDark: boolean;
}

export interface ICreateTicket {
    title: string
    description: string
    tags: ITag[]
    files: File[]
    developerId: number;
    type: ITicketTypes;
    priority: ITicketPriority;
    rate: IRate;
}


