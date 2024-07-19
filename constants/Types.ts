export type Rocket = {
    id: String;
    name: String;
    description: String;
    country: String;
    engines: Engines;
    flickr_images: [string];
  }
  
  export type Engines = {
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