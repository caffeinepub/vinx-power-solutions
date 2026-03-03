import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    name: string;
    sector: Sector;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export enum Sector {
    indianRailwayProjects = "indianRailwayProjects",
    civilInfrastructure = "civilInfrastructure",
    carify = "carify",
    electricalContracting = "electricalContracting"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getInquiriesBySector(sectorText: string): Promise<Array<Inquiry>>;
    getInquiryCount(): Promise<bigint>;
    submitInquiry(name: string, email: string, phone: string, message: string, sectorText: string): Promise<void>;
}
