import { Duration } from "./video_type";

export type Guest = {
	id: number;
	name: string;
};
export interface IUser extends Guest {
	isAuthor(): Promise<boolean>;
	isSynced(): Promise<boolean>;
	position(): Promise<Duration>;
}
