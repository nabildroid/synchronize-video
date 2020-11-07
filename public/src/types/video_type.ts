export interface Duration {
	minute: number;
	secoud: number;
	toTimestemp(): number;
}

export enum VideoState {
	WAITING, // for the author means waiting for watchers, for watchers means waiting for the author to start the video
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
