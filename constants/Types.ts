export type Rocket = {
    id: String;
    name: String;
    description: String;
    country: String;
    engine: Engine;
    flickr_images: [string];
  }
  
  export type Engine = {
    number: Number;
  }

export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean
  links: Links
}

export type Links = {
  patch: MissionPatch
}

export type MissionPatch = {
  small: string;
  large: string;
}