export interface ICurrency {
    quotes:    IRates;
    source:    string;
    success:   boolean;
    timestamp: number;
}

export interface IRates {
    RUBUSD: number;
    RUBEUR: number;
    RUBGBP: number;
    RUBCNY: number;
    RUBJPY: number;
    RUBTRY: number;
}
