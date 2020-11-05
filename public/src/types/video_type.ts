export interface Duration {
	minute: number;
	secoud: number;
	toTimestemp(): number;
}

export enum VideoState {
	WAITE,
	PLAYIED,
	PUASED,
}
export enum VideoType {
	BROADCAST,
	DOWNLOAD,
}
export type VideoLink =
	| {
			video: string;
			audio: string;
	  }
	| string;

export type BroadcastChunks = string[];

export type VideoData =
	| {
			type: VideoType.BROADCAST;
			chunks: BroadcastChunks;
	  }
	| {
			type: VideoType.DOWNLOAD;
			link: VideoLink;
	  };
